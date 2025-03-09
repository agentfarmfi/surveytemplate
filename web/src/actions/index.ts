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
  // Define the descriptions directly since we can't easily import from the packages at runtime
  const domains = {
    P: {
      title: 'Psychological Capital',
      shortDescription: 'Psychological Capital measures your positive psychological state of development characterized by self-efficacy, optimism, resilience, and hope.',
      description: `Psychological capital refers to an individual's positive psychological state of development that is characterized by: having confidence (self-efficacy) to take on and put in the necessary effort to succeed at challenging tasks; making a positive attribution (optimism) about succeeding now and in the future; persevering toward goals and, when necessary, redirecting paths to goals (hope) in order to succeed; and when beset by problems and adversity, sustaining and bouncing back and even beyond (resilience) to attain success.
      <br /><br />
      Individuals with high Psychological Capital believe in their abilities, expect positive outcomes, can generate multiple pathways to achieve their goals, and bounce back quickly from setbacks. These psychological resources are critical for entrepreneurial success as they help navigate the challenges, uncertainties, and setbacks inherent in entrepreneurial endeavors.
      <br /><br />
      People with low Psychological Capital may doubt their abilities, expect negative outcomes, struggle to find alternative paths to goals, and have difficulty recovering from setbacks. Lower levels of these psychological resources may make entrepreneurial journeys more challenging, as they can amplify the perceived difficulties and reduce perseverance.`,
      facets: [
        {
          facet: 1,
          title: 'Self-efficacy beliefs',
          text: `Having the confidence to take on and put in the necessary effort to succeed at challenging tasks. Individuals with high self-efficacy believe they can perform effectively in challenging situations. They approach difficult tasks as challenges to be mastered rather than threats to be avoided. Individuals with low self-efficacy doubt their capabilities and may avoid challenging tasks. They believe that difficult tasks and situations are beyond their ability to handle.`
        },
        {
          facet: 2,
          title: 'Optimism',
          text: `Making a positive attribution about succeeding now and in the future. Individuals with high optimism expect good things to happen in their life and work. They maintain a positive outlook even in the face of setbacks, believing that they can influence positive outcomes through their actions. Individuals with low optimism hold a pessimistic view about the future and generally expect that worse outcomes are more likely to occur. They may feel that effort doesn't affect outcomes and are less persistent in the face of challenges.`
        },
        {
          facet: 3,
          title: 'Resilience',
          text: `When beset by problems and adversity, sustaining and bouncing back and even beyond to attain success. Individuals with high resilience recover quickly from setbacks and use difficulties as a catalyst for growth. They are likely to emerge stronger from challenges and are adaptive in the face of adverse situations. Individuals with low resilience struggle to recover from setbacks and may be overwhelmed by challenges. They are less likely to see adversity as an opportunity for development and may stagnate or decline in performance when faced with difficulties.`
        },
        {
          facet: 4,
          title: 'Hope',
          text: `Persevering toward goals and, when necessary, redirecting paths to goals in order to succeed. Individuals with high hope set ambitious goals and have high perceived capability to devise strategies to reach those goals. They view obstacles as surmountable and are persistent in pursuing their goals. Individuals with low hope have difficulty setting or clarifying goals and lack the perseverance to follow through. They may give up easily when faced with obstacles and lack the strategy to manage goals effectively.`
        }
      ]
    },
    S: {
      title: 'Social Orientations',
      shortDescription: 'Social Orientations measures your tendencies in interpersonal exchanges, particularly whether you lean more toward taking (self-focused) or giving (other-focused) behaviors.',
      description: `Social orientations in the context of interpersonal and organizational behavior describe individuals' predispositions towards interacting with others, focusing on how they balance self-interests with the interests of others.
      <br /><br />
      Individuals with a stronger taker orientation prioritize their personal needs, are wary of others taking advantage of them, and are strategic about helping others only when it benefits them. Those with a stronger giver orientation are more concerned with others' needs, believe in helping without keeping score, and often go beyond equal exchanges to be more generous in their contributions.
      <br /><br />
      Both orientations can be successful in entrepreneurship depending on context. Taker tendencies can help protect personal interests and ensure fair treatment, while giver tendencies can build stronger networks, enhance team cohesion, and create positive reputations. The most effective entrepreneurs often develop a nuanced understanding of when each approach is most appropriate and beneficial.`,
      facets: [
        {
          facet: 1,
          title: 'Self-interest (taker)',
          text: `Self-interest refers to the extent to which individuals focus on their own interests, benefits, and well-being in their decision-making and behaviors. Individuals high in self-interest are motivated by factors that benefit themselves directly. They are likely to engage in behaviors that are expected to lead to personal gains, such as bonuses, promotions, or recognition. Individuals low in self-interest do not prioritize their personal gains very strongly. They may still consider personal benefits but are less driven by these considerations compared to those with high self-interest. Their actions may be less influenced by personal rewards or losses.`
        },
        {
          facet: 2,
          title: 'Reciprocation wariness (taker)',
          text: `This mindset involves caution in returning help, motivated by the fear of being taken advantage of. Individuals with high reciprocation wariness are skeptical of others' intentions in social exchanges and tend to guard against overextending themselves to avoid exploitation. Individuals with high levels of reciprocation wariness are very cautious about returning help, especially when there is a risk of being exploited. They may return help in smaller proportions than received, or only reciprocate when absolutely necessary, to minimize the chance of others taking advantage of their generosity. Those with low reciprocation wariness are less concerned about being exploited and more willing to return help freely. They tend to trust others' intentions more and are comfortable reciprocating generously without fearing negative consequences.`
        },
        {
          facet: 3,
          title: 'Other orientation (giver)',
          text: `Other-orientation refers to the extent to which individuals prioritize the needs, interests, and welfare of others in their decision-making and behaviors. Individuals with high other-orientation are characterized by their attentiveness to how their actions affect their colleagues and the broader group. They may prioritize the goals and well-being of the group or organization over their personal gains. Other-orientation is essentially about being socially considerate and cooperative, focusing on collective over individual success, and is often associated with traits like empathy, altruism, and prosocial behavior. Individuals with low other-orientation are less concerned with the effects of their actions on others. They are less likely to factor in the well-being or interests of their peers or the group outcomes in their decision-making processes.`
        },
        {
          facet: 4,
          title: 'Creditor ideology (giver)',
          text: `This mindset reflects a belief in the strategic advantage of over-reciprocating help received. Individuals who subscribe to the creditor ideology tend to return more help than they have received, anticipating that this will obligate others to them and lead to more generous repayments in the future. Individuals who strongly hold creditor ideologies are proactive in returning more help than they receive. They view their actions as investments that will yield future benefits, expecting that those they help will feel a stronger obligation to assist them later. Those with a low creditor ideology do not emphasize over-reciprocating. They may adhere more strictly to an equal exchange of help or may not believe in the strategic benefits of placing others in their debt. They tend to reciprocate only as much help as they have received, without attempting to manipulate future reciprocation.`
        }
      ]
    },
    W: {
      title: 'Work Goal Orientations',
      shortDescription: 'Work Goal Orientations measures your approach to challenges, learning, and performance in work contexts.',
      description: `Work goal orientations refer to the attitudes and predispositions individuals hold regarding the purpose and outcomes of their efforts and achievements at work. These orientations influence how individuals approach tasks, set goals, and respond to challenges and feedback in the workplace.
      <br /><br />
      Individuals with strong learning orientations seek out challenges that will develop their skills, view difficulties as learning opportunities, and are intrinsically motivated by mastery. Those with strong competitive performance orientations focus on demonstrating their abilities to others, comparing their performance favorably to peers, and gaining recognition for their competence. Those with strong avoidance orientations prioritize avoiding situations where they might appear incompetent, protecting their image over learning new skills.
      <br /><br />
      In entrepreneurial contexts, learning orientations support innovation, adaptation, and resilience through failures. Competitive performance orientations can drive high standards and achievement, while excessive avoidance orientations may limit risk-taking and innovation. Successful entrepreneurs often leverage learning orientations when facing novel challenges while balancing healthy performance standards.`,
      facets: [
        {
          facet: 1,
          title: 'Learning orientation',
          text: `Focuses on developing competence through acquiring new skills and mastering new situations. It is characterized by a desire to improve one's abilities and an understanding that effort leads to mastery over time. Individuals with high learning orientation seek out challenging tasks that enhance their knowledge and skills. They view errors and mistakes as opportunities for learning and growth, showing resilience in the face of setbacks. Individuals with low learning orientation may avoid tasks that require new skills or unfamiliar responsibilities. They tend to stick with what they know to avoid the risk of failure or displaying incompetence.`
        },
        {
          facet: 2,
          title: 'Competitive performance orientation',
          text: `Seeking to prove one's competence and gain favorable judgments from others. Individuals with high competitive performance orientation are driven to demonstrate their abilities and are motivated to excel in tasks where they can showcase their skills. They thrive on recognition and positive feedback from others. Individuals with low competitive performance orientation may not seek out opportunities to demonstrate their abilities prominently. They might prefer roles that do not require constant performance evaluation.`
        },
        {
          facet: 3,
          title: 'Avoidance orientation',
          text: `Focused on avoiding situations that might lead to unfavorable judgments about one's competence. Individuals with high avoidance orientation are primarily concerned with avoiding criticism and negative assessments of their abilities. They may avoid challenging tasks or situations where their skills could be negatively judged. Individuals with low avoidance orientation are less concerned with the risk of negative evaluation and more willing to take on challenges, regardless of the potential for negative feedback.`
        }
      ]
    },
    E: {
      title: 'Entrepreneurial Orientation',
      shortDescription: 'Entrepreneurial Orientation measures your preferences for autonomy, risk-taking, and innovation in business contexts.',
      description: `Entrepreneurial orientation refers to a specific state of mind which orients human conduct towards entrepreneurial activities and outcomes. Individuals with an entrepreneurial mindset are often characterized by their willingness to innovate, take risks, and seize opportunities that others might pass up.
      <br /><br />
      Individuals with high entrepreneurial orientation value independence in decision-making, are comfortable with calculated risks, and favor innovation over established approaches. They typically encourage autonomous action, are willing to venture into uncertain territory with potential for high returns, and prioritize creative solutions and novel approaches to problems.
      <br /><br />
      Those with lower entrepreneurial orientation prefer more structure and oversight, are more cautious about risks, and tend to favor established approaches over experimental ones. While high entrepreneurial orientation is often associated with venture creation and growth, different levels may be appropriate in different contexts and industries. The most successful entrepreneurs often know when to leverage their entrepreneurial tendencies and when more conservative approaches are warranted.`,
      facets: [
        {
          facet: 1,
          title: 'Autonomy',
          text: `Autonomy refers to the ability and the degree to which an individual or team operates independently within an organization to bring forth new ideas and see them through to completion. When an individual within the firm operates independently, initiating and implementing projects or strategies without needing to seek approval from higher-ups. High autonomy is associated with self-direction and independence in pursuing strategic objectives. Low autonomy involves limited freedom to make decisions or pursue initiatives without the consent or approval from others within the organization. This level of autonomy often results in a lack of initiative and slower response to market opportunities due to bureaucratic hurdles.`
        },
        {
          facet: 2,
          title: 'Risk Taking',
          text: `A comfortable attitude towards taking calculated risks, understanding that higher gains often come with the potential for losses. Risk taking involves the willingness to commit significant resources to opportunities that have a reasonable chance of high returns but also considerable risk of costly failures. High risk-taking refers to propensity to engage in significant investments or decisions that could lead to substantial variations in business performance, including potential high losses. High risk-taking involves bold moves like entering new markets or launching innovative products without certainty of success. Low risk-taking is characterized by cautiousness and a preference for safe strategies that are unlikely to result in significant losses. Firms with low risk-taking avoid uncertain investments and prefer maintaining the status quo or making incremental changes.`
        },
        {
          facet: 3,
          title: 'Innovativeness',
          text: `The ability to think outside the box and generate novel ideas that can be transformed into valuable products or services. Innovativeness is the tendency to support and pursue new ideas, novelty, experimentation, and creative processes that can result in new products, services, or technological processes. High innovativeness indicates a person's commitment to experimentation and innovation. This involves seeking new ideas, creative solutions, and novel approaches, which could result in new products, services, or internal processes. Low innovativeness indicates a preference for traditional approaches and proven solutions. Firms with low innovativeness are less likely to pursue new ideas or changes, sticking to established products or processes.`
        }
      ]
    }
  };
  
  // Create domain list for processing
  const domainList = [
    { 
      domain: 'P',
      title: domains.P.title, 
      facets: domains.P.facets,
      description: domains.P.shortDescription,
      text: domains.P.description
    },
    { 
      domain: 'S', 
      title: domains.S.title, 
      facets: domains.S.facets,
      description: domains.S.shortDescription,
      text: domains.S.description
    },
    { 
      domain: 'W', 
      title: domains.W.title, 
      facets: domains.W.facets,
      description: domains.W.shortDescription,
      text: domains.W.description
    },
    { 
      domain: 'E', 
      title: domains.E.title, 
      facets: domains.E.facets,
      description: domains.E.shortDescription,
      text: domains.E.description
    }
  ];
  
  // Transform score object into expected result format
  return domainList.map(domainInfo => {
    const domainScore = scores[domainInfo.domain] || { score: 0, count: 0, result: 'neutral', facet: {} };
    
    return {
      domain: domainInfo.domain,
      title: domainInfo.title,
      description: domainInfo.description,
      score: domainScore.averageScore || 0, // 1-5 scale
      result: domainScore.result || 'neutral',
      text: domainInfo.text,
      facets: domainInfo.facets.map(facetInfo => {
        const facetScore = domainScore.facet[facetInfo.facet] || { score: 0, count: 0, result: 'neutral' };
        
        return {
          facet: facetInfo.facet,
          title: facetInfo.title,
          score: facetScore.averageScore || 0, // 1-5 scale
          questionCount: facetScore.questionCount || 0,
          result: facetScore.result || 'neutral',
          text: facetInfo.text
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
