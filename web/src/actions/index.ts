'use server';

import { connectToDatabase } from '@/db';
import { ObjectId } from 'mongodb';
import { B5Error, DbResult, Feedback } from '@/types';
// Import custom scoring and result generation functions
// Custom domain type for our app
type ResultDomain = any;
import customChoices from '../../custom-choices';

interface Answer {
  domain: string;
  facet: number;
  score: number;
}

interface Facet {
  totalScore: number;
  questionCount: number;
  result: string;
  averageScore?: number;
}

interface DomainScore {
  totalScore: number;
  facetCount: number;
  result: string;
  facet: Record<string, Facet>;
  averageScore?: number;
}

// Custom implementation of the scoring function
function calculateScore({ answers }: { answers: Answer[] }) {
  const result: Record<string, DomainScore> = {};
  
  // Group answers by domain and facet
  answers.forEach(answer => {
    if (!result[answer.domain]) {
      result[answer.domain] = { 
        totalScore: 0, 
        facetCount: 0, 
        result: 'neutral', 
        facet: {} 
      };
    }
    
    // Add answer to its facet
    if (answer.facet) {
      const facetKey = answer.facet.toString();
      if (!result[answer.domain].facet[facetKey]) {
        result[answer.domain].facet[facetKey] = { 
          totalScore: 0, 
          questionCount: 0, 
          result: 'neutral' 
        };
      }
      
      const facet = result[answer.domain].facet[facetKey];
      facet.totalScore += answer.score;
      facet.questionCount++;
    }
  });
  
  // Calculate average scores for facets and domains
  Object.values(result).forEach(domain => {
    // Calculate average scores for each facet (1-5 scale)
    Object.values(domain.facet).forEach(facet => {
      // Calculate facet average (1-5 scale)
      facet.averageScore = parseFloat((facet.totalScore / facet.questionCount).toFixed(2));
      facet.result = calculateResult(facet.averageScore);
      
      // Add to domain's total for later averaging
      domain.totalScore += facet.averageScore;
      domain.facetCount++;
    });
    
    // Calculate domain average from facet averages (1-5 scale)
    domain.averageScore = parseFloat((domain.totalScore / domain.facetCount).toFixed(2));
    domain.result = calculateResult(domain.averageScore);
  });
  
  return result;
}

function calculateResult(score: number): string {
  // Score is already an average on 1-5 scale
  if (score > 3.5) { // Above 3.5 out of 5
    return 'high';
  } else if (score < 2.5) { // Below 2.5 out of 5
    return 'low';
  }
  return 'neutral';
}

// Custom implementation for result generation
function generateResult({ scores }: { scores: Record<string, DomainScore> }) {
  // Our domains
  const domains = [
    { domain: 'P', title: 'Psychological Capital', 
      facets: [
        { facet: 1, title: 'Self-efficacy beliefs' },
        { facet: 2, title: 'Optimism' },
        { facet: 3, title: 'Resilience' },
        { facet: 4, title: 'Hope' }
      ],
      description: 'Psychological Capital measures your positive psychological state of development characterized by self-efficacy, optimism, resilience, and hope.'
    },
    { domain: 'S', title: 'Social Orientations', 
      facets: [
        { facet: 1, title: 'Self-interest (taker)' },
        { facet: 2, title: 'Reciprocation wariness (taker)' },
        { facet: 3, title: 'Other orientation (giver)' },
        { facet: 4, title: 'Creditor ideology (giver)' }
      ],
      description: 'Social Orientations measures your tendencies in interpersonal exchanges, particularly whether you lean more toward taking (self-focused) or giving (other-focused) behaviors.'
    },
    { domain: 'W', title: 'Work Goal Orientations', 
      facets: [
        { facet: 1, title: 'Learning orientation' },
        { facet: 2, title: 'Competitive performance orientation' },
        { facet: 3, title: 'Avoidance orientation' }
      ],
      description: 'Work Goal Orientations measures your approach to challenges, learning, and performance in work contexts.'
    },
    { domain: 'E', title: 'Entrepreneurial Orientation', 
      facets: [
        { facet: 1, title: 'Autonomy' },
        { facet: 2, title: 'Risk Taking' },
        { facet: 3, title: 'Innovativeness' }
      ],
      description: 'Entrepreneurial Orientation measures your preferences for autonomy, risk-taking, and innovation in business contexts.'
    }
  ];
  
  // Transform score object into expected result format
  return domains.map(domainInfo => {
    const domainScore = scores[domainInfo.domain] || { score: 0, count: 0, result: 'neutral', facet: {} };
    
    return {
      domain: domainInfo.domain,
      title: domainInfo.title,
      description: domainInfo.description,
      score: domainScore.averageScore || 0, // 1-5 scale
      result: domainScore.result || 'neutral',
      facets: domainInfo.facets.map(facetInfo => {
        const facetScore = domainScore.facet[facetInfo.facet] || { score: 0, count: 0, result: 'neutral' };
        
        return {
          facet: facetInfo.facet,
          title: facetInfo.title,
          score: facetScore.averageScore || 0, // 1-5 scale
          questionCount: facetScore.questionCount || 0,
          result: facetScore.result || 'neutral',
          text: `This facet measures aspects of ${facetInfo.title}`
        };
      })
    };
  });
}

// Mock of the original getInfo function
const getInfo = () => ({
  languages: [
    { id: 'en', name: 'English' }
  ]
});

const collectionName = process.env.DB_COLLECTION || 'results';
const resultLanguages = getInfo().languages;

interface Language {
  id: string;
  name: string;
}

export type Report = {
  id: string;
  timestamp: number;
  availableLanguages: Language[];
  language: string;
  results: ResultDomain[];
};

export async function getTestResult(
  id: string,
  language?: string
): Promise<Report | undefined> {
  'use server';
  try {
    const query = { _id: new ObjectId(id) };
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const report = await collection.findOne(query);
    if (!report) {
      console.error(`The test results with id ${id} are not found!`);
      throw new B5Error({
        name: 'NotFoundError',
        message: `The test results with id ${id} is not found in the database!`
      });
    }
    const selectedLanguage =
      language ||
      (!!resultLanguages.find((l) => l.id == report.lang) ? report.lang : 'en');
    const scores = calculateScore({ answers: report.answers });
    const results = generateResult({ scores });
    return {
      id: report._id.toString(),
      timestamp: report.dateStamp,
      availableLanguages: resultLanguages,
      language: selectedLanguage,
      results
    };
  } catch (error) {
    if (error instanceof B5Error) {
      throw error;
    }
    throw new Error('Something wrong happend. Failed to get test result!');
  }
}

export async function saveTest(testResult: DbResult) {
  'use server';
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(testResult);
    return { id: result.insertedId.toString() };
  } catch (error) {
    console.error(error);
    throw new B5Error({
      name: 'SavingError',
      message: 'Failed to save test result!'
    });
  }
}

export type FeebackState = {
  message: string;
  type: 'error' | 'success';
};

export async function saveFeedback(
  prevState: FeebackState,
  formData: FormData
): Promise<FeebackState> {
  'use server';
  const feedback: Feedback = {
    name: String(formData.get('name')),
    email: String(formData.get('email')),
    message: String(formData.get('message'))
  };
  try {
    const db = await connectToDatabase();
    const collection = db.collection('feedback');
    await collection.insertOne({ feedback });
    return {
      message: 'Sent successfully!',
      type: 'success'
    };
  } catch (error) {
    return {
      message: 'Error sending feedback!',
      type: 'error'
    };
  }
}
