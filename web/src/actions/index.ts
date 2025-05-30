'use server';

import { connectToDatabase, closeConnection, trackOperation } from '@/db';
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
    let domain = answer.domain;
    let facet = answer.facet;
    
    if (!result[domain]) {
      result[domain] = { 
        totalScore: 0, 
        facetCount: 0, 
        result: 'neutral', 
        facet: {} 
      };
    }
    
    // Add answer to its facet
    if (facet) {
      const facetKey = facet.toString();
      if (!result[domain].facet[facetKey]) {
        result[domain].facet[facetKey] = { 
          totalScore: 0, 
          questionCount: 0, 
          result: 'neutral' 
        };
      }
      
      const facetObj = result[domain].facet[facetKey];
      facetObj.totalScore += answer.score;
      facetObj.questionCount++;
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
    C: {
      title: 'Innovation and Change',
      shortDescription: 'Innovation and Change measures your ability to drive strategic transformation through vision, inspiration, and creative thinking.',
      description: `Innovation driven individual contributes to strategic change by supporting a shared vision, offering forward-thinking ideas, and promoting innovation within the team. These individuals actively seek opportunities for improvement, adapt to changing circumstances, and encourage others to think creatively and embrace new approaches. Their behavior helps the team stay agile, innovative, and aligned with evolving goals.
      <br /><br />
      A high focus on innovation and change describes individuals who proactively seek opportunities for improvement, communicate compelling visions of the future, inspire others to embrace new ideas, and foster a culture of creativity and experimentation.
      <br /><br />
      A low focus on innovation and change describes individuals who tend to favor stability, familiar routines, and proven methods over new ideas or transformative approaches. They may be hesitant to question existing practices, less responsive to change, and reluctant to take creative risks.`,
      facets: [
        {
          facet: 1,
          title: 'Vision',
          text: `Vision reflects an individual's ability to communicate a clear and compelling picture of the future that is grounded in organizational values. A high score indicates an individual who effectively articulates long-term goals and inspires others by linking daily work to a meaningful, strategic direction. This fosters alignment, motivation, and a shared sense of purpose across the team or organization. A low score suggests difficulty in defining or conveying a future-oriented vision. Such individuals may focus primarily on short-term tasks and operational issues, which can lead to ambiguity about direction and purpose. As a result, teams may lack inspiration, cohesion, and alignment with broader organizational goals.`
        },
        {
          facet: 2,
          title: 'Inspiring others',
          text: `Inspiring Others reflects an individual's ability to communicate and act in ways that motivate and energize those around them. A high score indicates someone who effectively articulates shared goals, expresses what is meaningful and important, and inspires others with a compelling vision of what is possible and how to achieve it. They help create a sense of purpose, elevate expectations, and generate enthusiasm within the team. A low score suggests difficulty in motivating others or conveying shared goals in a way that resonates. Such individuals may struggle to instill meaning in the work or to foster optimism about what can be achieved. This can result in lower engagement, diminished team morale, and reduced overall performance.`
        },
        {
          facet: 3,
          title: 'Creative approach',
          text: `Creative Approach reflects a preference for experimentation, originality, and openness to new ideas. A high score refers to an individual who tends to view problems as opportunities, enjoys uncertainty and freedom, and is comfortable with subjectivity and impulsive thinking. They embrace challenges as chances to innovate and often seek unconventional solutions. A low score indicates a preference for structure, predictability, and established methods. Such individuals may feel uneasy with ambiguity and are more likely to rely on proven approaches rather than explore novel or untested ideas. They may be less inclined to take creative risks or deviate from standard procedures.`
        },
        {
          facet: 4,
          title: 'Driving innovation',
          text: `Fostering Innovative Thinking reflects the extent to which a team member demonstrates intellectual curiosity, creativity, and independent problem-solving within the team. A high score indicates someone who challenges conventional thinking, reexamines assumptions, explores new perspectives, and contributes original ideas. These team members help create an environment where it is safe and encouraged to question existing practices and solve problems in novel ways. Their contributions support a team culture of adaptability, learning, and innovation. A low score suggests a preference for established approaches and reluctance to deviate from traditional methods. Such individuals may offer limited creative input, which can reduce the team's overall dynamism and responsiveness to new challenges.`
        }
      ]
    },
    L: {
      title: 'Learning and Development',
      shortDescription: 'Learning and Development measures your focus on continuous learning, seeking insights, and supporting others\' growth.',
      description: `Learning and growth driven individual focuses on supporting the development of others and fostering a culture of continuous learning. A high score indicates someone who actively engages in mentoring, shares feedback, and encourages learning opportunities that align with both team goals and personal aspirations. These individuals help others grow their skills, boost morale, and contribute to a dynamic, adaptable team environment.
      <br /><br />
      High focus on learning and development includes pursuing challenging assignments, seeking stakeholder insights, analyzing problems thoroughly, and actively coaching others to grow their skills and capabilities.
      <br /><br />
      Low focus on learning and growth indicates that an individual may prioritize task completion over learning and provide limited guidance or encouragement for growth.`,
      facets: [
        {
          facet: 1,
          title: 'Pursuing learning opportunities',
          text: `Seeking learning reflects an individual's focus on developing competence by acquiring new skills and mastering unfamiliar situations. A high score indicates a strong desire to improve, a belief that effort leads to growth, and a willingness to take on challenges that promote learning. These individuals view mistakes as valuable learning opportunities and tend to show resilience in the face of setbacks. A low score suggests a tendency to avoid tasks that require new skills or unfamiliar responsibilities. Such individuals may prefer sticking to familiar routines to minimize the risk of failure or appearing incompetent, which can limit their development over time.`
        },
        {
          facet: 2,
          title: 'Seeking stakeholder insight',
          text: `Seeking Stakeholder Insight reflects the extent to which an individual actively engages people outside their immediate team, such as internal customers, external partners, or colleagues from other departments, to gather feedback, perspectives, and knowledge that can improve the team's work and decision-making. A high score indicates someone who regularly seeks input from internal and external stakeholders, values diverse perspectives, and actively invites others to contribute to team learning and improvement. These individuals help build cross-functional collaboration and ensure the team's work is informed by relevant, real-world insights. A low score suggests the individual tends to rely mainly on internal viewpoints, may overlook valuable external contributions, and misses opportunities for feedback that could drive learning and innovation.`
        },
        {
          facet: 3,
          title: 'Analyzing challenges',
          text: `Analytical Approach reflects how much an individual relies on logic and detailed analysis to understand and solve problems. A high score indicates someone who enjoys examining problems thoroughly, uncovering underlying logic, and making decisions based on careful reasoning. These individuals tend to be systematic, precise, and intellectually curious about how things work. A low score suggests a preference for intuitive or experience-based thinking, with less focus on deep analysis or logical structure. Such individuals are more comfortable relying on gut feeling, quick judgment, or broad understanding rather than detailed breakdowns.`
        },
        {
          facet: 4,
          title: 'Coaching others',
          text: `Coaching others reflects the extent to which an individual supports the growth and development of their peers through guidance, encouragement, and shared learning. A high score indicates someone who is attentive to others' strengths, needs, and goals. They offer support, share knowledge, and help others develop by providing constructive feedback and encouragement. These individuals contribute to a team culture of learning, empowerment, and continuous improvement. A low score suggests limited engagement in supporting others' development. Such individuals may focus solely on their own tasks, offer little guidance or feedback, and overlook opportunities to help peers grow. This can lead to missed chances for team learning, reduced collaboration, and underdeveloped potential within the group.`
        }
      ]
    },
    T: {
      title: 'Driving for Results',
      shortDescription: 'Driving for Results measures your focus on task performance, role clarity, and achieving outcomes.',
      description: `Driving for results reflects how much an individual focuses on task performance, translating goals into action, drives progress, and supporting others in achieving outcomes. Results-oriented individuals work toward recognizing the roles and tasks required for employees to reach desired outcomes; they also clarify these requirements for others, thus creating the confidence they need to exert the necessary effort.
      <br /><br />
      High results orientation includes defining clear roles and responsibilities, planning and structuring work effectively, monitoring performance and progress, pursuing achievement and recognition, and providing feedback to support goal attainment.
      <br /><br />
      A low results-orientation indicates a struggle to maintain focus on goals, follow through on tasks, or push for progress.`,
      facets: [
        {
          facet: 1,
          title: 'Defining Roles',
          text: `Defining Roles reflects the extent to which an individual contributes to role clarity and shared expectations within the team. A high score indicates someone who values structure, clearly communicates responsibilities, and helps ensure that everyone understands their role in achieving team objectives. These individuals support accountability and efficient collaboration by promoting clarity and alignment. A low score suggests a more flexible or unstructured approach to roles. Such individuals may be adaptable and open to shifting responsibilities, but this can also lead to confusion or inefficiencies if expectations are not clearly defined.`
        },
        {
          facet: 2,
          title: 'Planning and structuring',
          text: `Planning and Structuring approach reflects how much an individual prefers organization, control, and structured processes when working toward goals. A high score indicates someone who values clear plans, routines, and preparation. These individuals prefer to work in structured environments, organize tasks carefully, and rely on planning to achieve objectives. A low score suggests a preference for flexibility, spontaneity, and adaptability. Such individuals may be less focused on detailed planning and more comfortable working in unstructured or changing environments. While this can support creativity, it may also lead to disorganization or missed deadlines if not balanced with sufficient structure.`
        },
        {
          facet: 3,
          title: 'Monitoring',
          text: `Monitoring reflects the extent to which an individual pays attention to task execution, quality, and alignment with goals. A high score indicates someone who is detail-oriented, observant, and proactive in tracking progress. They regularly assess their own and others' work to ensure it meets expectations, contributing to accountability and consistency within the team. A low score suggests a more hands-off or flexible approach. These individuals may rely on trust and autonomy rather than close oversight, which can foster independence but may also lead to unclear standards or uneven performance.`
        },
        {
          facet: 4,
          title: 'Pursuing achievement',
          text: `Achievement orientation reflects the extent to which an individual is motivated to demonstrate competence and gain recognition from others. A high score indicates someone who strives to excel, seeks opportunities to showcase their skills, and is driven by positive evaluations and external feedback. A low score suggests less concern with proving abilities or gaining recognition. Such individuals may prefer roles with less visibility or performance pressure and may focus more on learning or task completion than on external validation.`
        },
        {
          facet: 5,
          title: 'Providing feedback',
          text: `Providing Feedback reflects the extent to which an individual offers constructive input, encouragement, and guidance to support others' development. A high score indicates someone who regularly gives timely, specific, and actionable feedback. They balance praise with suggestions for improvement, contributing to a culture of learning, clarity, and accountability. A low score suggests someone who gives limited or infrequent feedback. While this may reduce pressure, it can also lead to missed opportunities for growth, unclear expectations, and reduced motivation or recognition among team members.`
        }
      ]
    },
    R: {
      title: 'Building Team Spirit',
      shortDescription: 'Building Team Spirit measures your ability to foster unity, trust, and inclusive relationships within teams.',
      description: `Building Team Spirit reflects the extent to which an individual fosters a sense of unity, trust, and inclusiveness within a team or organization. An individual with a high focus on team spirit actively promotes positive relationships, encourages open communication, and helps create a psychologically safe and supportive team climate. These individuals contribute to a culture of mutual respect, collaboration, and shared purpose.
      <br /><br />
      High team spirit includes building trust through integrity and ethical decision-making, promoting inclusive decision-making, providing social support to teammates, and investing in personal relationships beyond work tasks.
      <br /><br />
      A low focus on team spirit suggests that a person is less focused on team cohesion or interpersonal dynamics. They may prioritize individual tasks over group connection, which can result in weaker trust, reduced collaboration, and a less inclusive team atmosphere.`,
      facets: [
        {
          facet: 1,
          title: 'Building trust',
          text: `Building Trust reflects the extent to which an individual earns the confidence and respect of others through integrity, consistency, and a focus on collective well-being. A high score indicates someone who acts with authenticity and ethical conviction, aligns actions with shared values, and contributes to a climate of mutual respect, pride, and loyalty within the team. A low score suggests someone who may be perceived as less transparent or dependable. While they may still contribute to results, their impact may rely more on formal authority or competence than on trust, which can weaken team cohesion and collaboration over time.`
        },
        {
          facet: 2,
          title: 'Inclusive decision-making',
          text: `Inclusive decision-making reflects the extent to which an individual encourages shared input, collaboration, and inclusive problem-solving within the team. A high score indicates someone who values dialogue, seeks diverse perspectives, and involves others in shaping decisions. This approach fosters mutual respect, shared ownership, and stronger team alignment. A low score suggests someone who prefers to make decisions independently or with minimal input from others. While this may speed up processes, it can reduce engagement, limit collaboration, and weaken team cohesion over time.`
        },
        {
          facet: 3,
          title: 'Social support',
          text: `Social support reflects the extent to which an individual shows care for the well-being and needs of others in the team. A high score indicates someone who is empathetic, attentive, and relationship-oriented. They consider others' perspectives, contribute to a positive and inclusive atmosphere, and show concern for both personal and professional well-being—helping foster trust, morale, and team cohesion. A low score suggests less focus on interpersonal dynamics. These individuals may prioritize tasks over relationships, overlook emotional needs, or engage less in peer support, which can lead to reduced connection, morale, and team engagement.`
        },
        {
          facet: 4,
          title: 'Social bonding',
          text: `Social bonding reflects the extent to which an individual invests in forming personal, non-task-related relationships with teammates through informal conversations and mutual sharing. A high score indicates someone who actively engages in getting to know their teammates on a personal level, participates in casual conversations, and shares aspects of their own life. These individuals help create a warm, connected team climate that fosters trust, collaboration, and psychological safety. A low score suggests someone who keeps interactions strictly task-focused and invests little in informal or personal exchanges. While this may maintain professionalism, it can limit social bonding, reduce a sense of belonging, and weaken interpersonal trust within the team.`
        }
      ]
    },
    S: {
      title: 'Prosocial Approach',
      shortDescription: 'Prosocial Approach measures your balance between concern for others and self-interest in collaborative situations.',
      description: `A prosocial approach refers to individual's intentional behaviors that aim to support, help, or promote the well-being of others. These behaviors go beyond formal job requirements and are motivated by concern for others, a desire to contribute, or a sense of shared responsibility. While such actions often align with altruism, they may also be driven by rational self-interest or social norms, and their impact is linked to enhanced collaboration, trust, and organizational effectiveness.
      <br /><br />
      High level of prosocial approach include high other orientation and high self-concern, balancing attention to colleagues' needs and interests with awareness of one's own goals and aspirations.
      <br /><br />
      Low prosocial approach may indicate either limited concern for others' welfare or insufficient attention to one's own legitimate interests and needs.`,
      facets: [
        {
          facet: 1,
          title: 'Other-orientation',
          text: `Other-orientation refers to the degree to which individuals consider and prioritize the needs, interests, and well-being of others in their decisions and actions. Those high in other-orientation are socially considerate, empathetic, and cooperative, often placing group goals above personal gain. In contrast, individuals low in other-orientation are less concerned with the impact of their behavior on others.`
        },
        {
          facet: 2,
          title: 'Self-concern',
          text: `Self-concern refers to the extent to which individuals prioritize their own interests, benefits, and well-being in their decisions and actions. Those high in self-concern are primarily motivated by personal gains, rewards, or recognition and focus on how outcomes affect their own success. In contrast, individuals low in self-concern are less driven by personal benefit and more willing to act without strong consideration of personal rewards or losses.`
        }
      ]
    },
    A: {
      title: 'Technology Adoption Attitude',
      shortDescription: 'Technology Adoption Attitude measures how quickly you embrace and integrate new technologies and innovations.',
      description: `Technology adoption attitudes refer to the perspectives and predispositions individuals or organizations hold towards embracing new technologies. These attitudes significantly influence the decision-making process regarding whether to accept or reject technological innovations.
      <br /><br />
      This dimension examines where individuals fall on the technology adoption spectrum, from pioneers who eagerly adopt cutting-edge innovations to skeptics who prefer established solutions and traditional approaches. Understanding one's technology adoption profile helps recognize how they approach change and innovation.
      <br /><br />
      Each adoption style has its strengths. Innovators drive progress and explore new frontiers, visionaries help bridge innovations to practical applications, pragmatists ensure technologies provide real value, conservatives maintain stability during change, and skeptics provide important critical perspectives on the risks and limitations of new technologies.`,
      facets: [
        {
          facet: 1,
          title: 'Innovator (Pioneer)',
          text: `An innovator is a creative individual who actively generates new ideas and solutions, embraces experimentation, and is willing to take risks to explore untested paths. Motivated by the advancement of new technologies and innovations, innovators are often the first to adopt emerging tools or practices, even in the face of uncertainty. Their openness to novelty and strong internal drive to push boundaries make them key catalysts for change and progress in organizations and society.`
        },
        {
          facet: 2,
          title: 'Visionary (Early Adopter)',
          text: `A visionary is an intuitive and forward-thinking individual who embraces new ideas and recognizes the potential of emerging technologies early on. As an opinion leader, they often influence others through their informed and enthusiastic support for innovation. While open to change, visionaries adopt new ideas carefully and strategically, balancing excitement with thoughtful evaluation. They are motivated by the opportunities that new technologies and innovations offer for growth, impact, and transformation.`
        },
        {
          facet: 3,
          title: 'Pragmatic (Early Majority)',
          text: `A pragmatic is an analytical and deliberate individual who supports gradual evolution over radical change. They tend to adopt new ideas just before the average person, carefully weighing the evidence and proven benefits. Pragmatics manage risks by seeking practical, problem-solving applications of technology, and are motivated by clear, measurable improvements. Their balanced approach helps bridge the gap between early innovation and broader adoption within organizations and communities.`
        },
        {
          facet: 4,
          title: 'Conservative (Late Majority)',
          text: `A conservative is a cautious and tradition-bound individual who prefers stability and familiar practices over change. They follow established standards and avoid taking risks, often waiting until a new technology or innovation has been widely tested and accepted before adopting it. Conservatives adopt new ideas only after the average person, and are motivated primarily by certainty, reliability, and proven effectiveness. Their adoption is often driven by necessity rather than enthusiasm for innovation.`
        },
        {
          facet: 5,
          title: 'Skeptic (Laggard)',
          text: `A skeptic is a doubter who is highly resistant to change and typically the last to adopt an innovation, if at all. They tend to reject most new ideas, highlighting potential risks and unintended consequences rather than potential benefits. Deeply rooted in established ways of doing things, skeptics are difficult to motivate and often require substantial proof, pressure, or necessity before considering any shift. Their cautious stance serves as a counterbalance to rapid change, emphasizing reflection and risk awareness.`
        }
      ]
    }
  };
  
  // Create domain list for processing
  const domainList = [
    { 
      domain: 'C',
      title: domains.C.title, 
      facets: domains.C.facets,
      description: domains.C.shortDescription,
      text: domains.C.description
    },
    { 
      domain: 'L', 
      title: domains.L.title, 
      facets: domains.L.facets,
      description: domains.L.shortDescription,
      text: domains.L.description
    },
    { 
      domain: 'T', 
      title: domains.T.title, 
      facets: domains.T.facets,
      description: domains.T.shortDescription,
      text: domains.T.description
    },
    { 
      domain: 'R',
      title: domains.R.title, 
      facets: domains.R.facets,
      description: domains.R.shortDescription,
      text: domains.R.description
    },
    { 
      domain: 'S', 
      title: domains.S.title, 
      facets: domains.S.facets,
      description: domains.S.shortDescription,
      text: domains.S.description
    },
    { 
      domain: 'A', 
      title: domains.A.title, 
      facets: domains.A.facets,
      description: domains.A.shortDescription,
      text: domains.A.description
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
  return trackOperation(async () => {
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
  });
}

export async function saveTest(testResult: DbResult) {
  'use server';
  return trackOperation(async () => {
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
  });
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
  return trackOperation(async () => {
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
  });
}