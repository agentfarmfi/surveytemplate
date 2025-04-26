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
    // Handle the migration of "Providing Feedback" from T4 to L3
    // This ensures that existing test results continue to work correctly
    let domain = answer.domain;
    let facet = answer.facet;
    
    // Remap T4 (Providing Feedback) to L3
    if (domain === 'T' && facet === 4) {
      domain = 'L';
      facet = 3;
    }
    
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
    R: {
      title: 'Technology Readiness',
      shortDescription: 'Technology Readiness measures an individual\'s propensity to adopt new technologies.',
      description: `Technology Readiness refers to an individual's propensity to adopt new technologies. This dimension reflects how people interact with and perceive technology in their daily lives, influencing their willingness to embrace technological innovations.
      <br /><br />
      Individuals with high Technology Readiness scores tend to be optimistic about technology's benefits, feel confident in their technological abilities, and are quick to adopt new tools and systems. They see technology as enhancing their productivity and quality of life.
      <br /><br />
      Those with lower Technology Readiness scores may experience discomfort or insecurity with technology, be more cautious about adopting new technologies, or feel overwhelmed by technological change. They may see technology as complex or potentially harmful to personal interactions.`,
      facets: [
        {
          facet: 1,
          title: 'Optimism',
          text: `Optimism is a positive view of technology and a belief that it offers people increased control, flexibility, and efficiency in their lives. Individuals with high technology optimism believe that technology generally makes their lives better, provides more freedom, and increases their productivity. They see technological innovations as primarily beneficial. Those with low optimism may doubt the benefits of technology and question whether technological advances truly improve quality of life.`
        },
        {
          facet: 2,
          title: 'Proficiency',
          text: `Proficiency is a tendency to be a technology pioneer and thought leader. It reflects confidence in one's ability to learn quickly and easily to use new technologies, as well as a sense of being technologically competent. Individuals who score high on proficiency feel they understand technology well, can solve technical problems, and often help others with technology. Those with low proficiency scores may feel they struggle with technology more than others and are less confident in their ability to learn and use new systems.`
        },
        {
          facet: 3,
          title: 'Discomfort',
          text: `Discomfort refers to a perceived lack of control over technology and a feeling of being overwhelmed by it. Individuals with high discomfort scores feel technology can be confusing, that technology systems are rarely designed with ordinary users in mind, and that documentation and instructions are often too complex. Those with low discomfort scores feel more at ease with technology and find it relatively straightforward to understand and use.`
        },
        {
          facet: 4,
          title: 'Insecurity',
          text: `Insecurity refers to distrust of technology, stemming from skepticism about its ability to work properly and concerns about its potential harmful consequences. People with high insecurity scores worry about the negative impacts of technology, such as excessive dependence, harmful distractions, or decreased quality of human relationships. Those with low insecurity scores have fewer concerns about technology's potential negative effects on society or personal life.`
        }
      ]
    },
    W: {
      title: 'Work Goal Orientations',
      shortDescription: 'Work Goal Orientations measures your approach to challenges, learning, and performance in work contexts.',
      description: `Work goal orientations refer to the attitudes and predispositions individuals hold regarding the purpose and outcomes of their efforts and achievements at work. These orientations influence how individuals approach tasks, set goals, and respond to challenges and feedback in the workplace.
      <br /><br />
      Individuals with strong learning orientations seek out challenges that will develop their skills, view difficulties as learning opportunities, and are intrinsically motivated by mastery. Those with strong performance orientations focus on demonstrating their abilities to others, comparing their performance favorably to peers, and gaining recognition for their competence. Those with strong avoidance orientations prioritize avoiding situations where they might appear incompetent, protecting their image over learning new skills.
      <br /><br />
      Different work goal orientations may be effective in different contexts. Learning orientations support innovation, adaptation, and resilience through difficulties. Performance orientations can drive high standards and achievement, while avoidance orientations may be protective in highly critical environments.`,
      facets: [
        {
          facet: 1,
          title: 'Learning orientation',
          text: `Learning orientation focuses on developing competence through acquiring new skills and mastering new situations. It is characterized by a desire to improve one's abilities and an understanding that effort leads to mastery over time. Individuals with high learning orientation tend to seek out challenging tasks that enhance their knowledge and skills. They view errors and mistakes as opportunities for learning and growth, showing resilience in the face of setbacks. Individuals with low learning orientation may avoid tasks that require new skills or unfamiliar responsibilities. They tend to stick with what they know to avoid the risk of failure or displaying incompetence.`
        },
        {
          facet: 2,
          title: 'Performance orientation',
          text: `Performance orientation refers to seeking to prove one's competence and gain favorable judgments from others. Individuals with high performance orientation are driven to demonstrate their abilities and are motivated to excel in tasks where they can showcase their skills. They thrive on recognition and positive feedback from others. Individuals with low performance orientation may not seek out opportunities to demonstrate their abilities prominently. They might prefer roles that do not require constant performance evaluation.`
        },
        {
          facet: 3,
          title: 'Avoidance orientation',
          text: `Avoidance orientation is focused on avoiding situations that might lead to unfavorable judgments about one's competence. Individuals with high avoidance orientation are primarily concerned with avoiding criticism and negative assessments of their abilities. They may avoid challenging tasks or situations where their skills could be negatively judged. Individuals with low avoidance orientation are less concerned with the risk of negative evaluation and more willing to take on challenges, regardless of the potential for negative feedback.`
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
    },
    C: {
      title: 'Strategic Leadership - Driving Change',
      shortDescription: 'Strategic Leadership - Driving Change measures your ability to articulate vision, inspire others, and drive organizational transformation.',
      description: `Change-Oriented Leader articulates an inspiring vision and direction, formulates strategy, and encourages innovation and creativity. Change-oriented leadership behavior focuses on driving strategic organizational change, fostering innovation, and facilitating adaptation.
      <br /><br />
      Leaders with high change leadership scores excel at creating and communicating compelling visions of the future. They inspire trust and enthusiasm, build commitment to change initiatives, and help connect daily activities to broader organizational goals.
      <br /><br />
      Those with lower change leadership scores may focus more on operational aspects of leadership rather than transformational elements. They might be less comfortable articulating long-term visions or may struggle to generate enthusiasm for change initiatives.`,
      facets: [
        {
          facet: 1,
          title: 'Vision',
          text: `Leaders with a high score in the "vision" scale can communicate a clear of an idealized picture of the future based around organizational values. They demonstrate forward-thinking, have a clear sense of long-term direction, and can proactively adjust strategies based on changing circumstances. In contrast, leaders with low score in vision might struggle to define or communicate long-term goals that align with organizational values, potentially leading to ambiguity about the direction and purpose of the team or organization. They may concentrate more on immediate tasks and operational details rather than developing and sharing a compelling strategic vision. This can result in a workforce that lacks a unified sense of direction or inspiration, which could impact long-term planning and alignment with broader organizational goals.`
        },
        {
          facet: 2,
          title: 'Inspiring Others',
          text: `Leaders with a high score in the "inspiring others" scale communicate and behave in ways that inspire others. Inspirational leaders articulate, in simple ways, shared goals and mutual understanding of what is right and important. They provide visions of what is possible and how to attain them. They enhance meaning and promote positive expectations about what needs to be done. In contrast, a low score on inspiring others indicates a leadership style that may be less effective at motivating and energizing the team. Leaders with this profile could struggle to articulate shared goals and visions in a way that resonates deeply with their team members. They might lack the ability to enhance the meaning of work or to promote positive expectations about tasks and objectives. As a result, these leaders may find it challenging to cultivate a sense of purpose and enthusiasm among their team members, which can lead to a lack of engagement and a decrease in overall team performance.`
        }
      ]
    },
    D: {
      title: 'Strategic Leadership - People Development',
      shortDescription: 'Strategic Leadership - People Development measures your commitment to nurturing employee growth through coaching, mentoring, and supporting professional development.',
      description: `A high score on people development signifies a leadership style committed to nurturing employee growth. Leaders excelling in this area actively engage in coaching, mentoring, and providing personalized feedback. They facilitate opportunities for training that align with both organizational goals and individual career aspirations. By investing in their team's development, these leaders enhance skill sets, boost job satisfaction, and foster a culture of continuous learning, creating a dynamic and adaptable workforce ready to meet future challenges.
      <br /><br />
      Leaders who prioritize people development create pathways for team members to grow professionally and personally. They take time to understand individual aspirations, offer targeted guidance, and create opportunities for skill enhancement and learning.
      <br /><br />
      Those with lower people development scores may invest less time in nurturing talent or may take a more hands-off approach to team member growth. While this might allow for natural skill development, it can also limit potential and reduce engagement among team members seeking growth opportunities.`,
      facets: [
        {
          facet: 1,
          title: 'Coaching and Mentoring',
          text: `Coaching and Mentoring reflects the degree to which a leader supports individual development through personalized guidance, support, and growth opportunities. A high score on this scale indicates a leader who is attuned to the unique strengths, needs, and aspirations of each team member. They offer personalized support, assign tasks based on individual potential, and invest in developmental opportunities that promote long-term growth. These leaders foster a culture that values learning, empowerment, and continuous improvement, aiming to help individuals reach their full potential. A low score suggests a leader who takes a less individualized approach, offering limited attention to team members' personal development or unique needs. They may assign work uniformly without considering individual fit or overlook opportunities to mentor and support growth. Over time, this may result in underutilized talent, reduced engagement, and fewer opportunities for team members to advance or expand their capabilities.`
        },
        {
          facet: 2,
          title: 'Supporting Growth and Development',
          text: `High score on the "supporting growth and development" identifies leaders who focus on engaging in career planning discussions with team members, helping them identify career goals and aspirations, and investing in training programs and skill development initiatives. These leaders actively create pathways for professional advancement, regularly discuss long-term career aspirations, and connect team members with resources and opportunities that enhance their skills. Leaders with lower scores in this area may focus less on long-term career development, perhaps concentrating more on immediate performance rather than future potential. They might provide fewer structured opportunities for training or advancement discussions, potentially limiting team members' professional growth trajectories.`
        }
      ]
    },
    T: {
      title: 'Operational Leadership - Results Management',
      shortDescription: 'Operational Leadership - Results Management measures your approach to defining roles, monitoring performance, and solving problems.',
      description: `Results-oriented leadership encompasses translating vision and strategy into objectives and key results, developing operational plans, defining roles and responsibilities, allocating resources, identifying gaps and new risks, problem-solving, and acknowledging and rewarding success. Results-oriented leaders work toward recognizing the roles and tasks required for employees to reach desired outcomes; they also clarify these requirements for employees, thus creating the confidence they need to exert the necessary effort.
      <br /><br />
      Leaders with high results management scores excel at creating structure and clarity, ensuring accountability, identifying and addressing problems. They establish a foundation of clear expectations and performance monitoring that supports team success.
      <br /><br />
      Those with lower results management scores may be less focused on formal structures, specific guidelines, or systematic monitoring. This can sometimes lead to ambiguity about roles and expectations, but might also foster greater autonomy and flexibility within the team.`,
      facets: [
        {
          facet: 1,
          title: 'Defining Roles',
          text: `Defining Roles reflects the degree to which a leader establishes clear responsibilities and expectations for team members. A high score in this scale indicates a leader who emphasizes clarity, structure, and accountability. These leaders are meticulous in setting clear expectations and well-defined roles for their team members, fostering an environment that prioritizes efficiency and structured workflows. Their performance-driven leadership style ensures that everyone understands their individual contributions to the organization's objectives, enhancing overall productivity. A low score on defining role scale indicates that a leader may take a less structured approach to defining roles and setting expectations. This style can lead to greater flexibility within the team, but might also cause confusion and inefficiencies if team members are unclear about their responsibilities. Such leaders may focus more on adaptability and creativity, potentially at the cost of clarity and accountability in team roles and tasks.`
        },
        {
          facet: 2,
          title: 'Monitoring',
          text: `Monitoring Performance reflects the extent to which a leader actively oversees and evaluates work to ensure alignment with expectations and goals. A high score on this scale indicates a leader who is vigilant, structured, and detail-oriented. They frequently observe, assess, and provide feedback on task execution, ensuring that performance aligns with predefined standards and objectives. These leaders help maintain accountability, consistency, and quality within the team. A low score suggests a leader who adopts a more hands-off or trusting approach, engaging less frequently in formal or informal monitoring. They may provide team members with greater autonomy and flexibility, relying on individual responsibility rather than continuous oversight. While this can foster independence, it may also lead to inconsistencies or reduced clarity on performance expectations.`
        },
        {
          facet: 3,
          title: 'Solving Problems',
          text: `Solving Problems reflects a leader's capacity to anticipate and address challenges that may hinder team or organizational performance. A high score on this scale indicates a leader who is proactive, solution-oriented, and forward-thinking. This leader actively monitors for potential issues, identifies problems early, and takes decisive, effective action to resolve them before they escalate. They create a sense of stability and reliability within the team by minimizing disruption and maintaining momentum. A low score suggests a leader who is more reactive or hesitant in addressing problems. They may delay action, overlook early warning signs, or struggle to implement effective solutions in a timely manner. As a result, issues may grow larger or recur, potentially undermining team performance and trust.`
        }
      ]
    },
    L: {
      title: 'Operational Leadership - Building Relationships',
      shortDescription: 'Operational Leadership - Building Relationships measures your ability to build trust, provide supportive leadership, and deliver effective feedback.',
      description: `Relationship-oriented leadership is characterized by its emphasis on fostering an inclusive, safe, and trusting climate, and promoting positive relationships within an organization, team, and dyad.
      <br /><br />
      Leaders with high relationship leadership scores prioritize building trust, demonstrating integrity, showing genuine concern for team members' wellbeing, and providing constructive feedback. They create psychologically safe environments where people feel valued, understood, and supported in their growth.
      <br /><br />
      Those with lower relationship leadership scores may focus less on the interpersonal aspects of leadership, potentially concentrating more on tasks and objectives than on building strong personal connections. While this might streamline efficiency in some contexts, it may reduce emotional engagement and team cohesion over time.`,
      facets: [
        {
          facet: 1,
          title: 'Building Trust',
          text: `Building Trust reflects the degree to which a leader earns the confidence, respect, and admiration of their team by consistently acting with integrity and prioritizing collective interests. A high score on this scale indicates a leader who serves as a trusted role model, inspiring pride and loyalty by demonstrating authenticity, consistency, and moral conviction. These leaders openly share their core values and beliefs, act in alignment with ethical principles, and focus on the long-term good of the team or organization. Their actions foster a strong foundation of mutual respect and shared purpose. A low score suggests a leader who may be perceived as less transparent, consistent, or aligned with group values. While they may still focus on results, their influence may rest more on authority than trust. As a result, team members may experience less emotional connection or confidence in the leader's intentions, which can impact collaboration and morale over time.`
        },
        {
          facet: 2,
          title: 'Supportive Leadership',
          text: `Supportive Leadership reflects the extent to which a leader shows care for the well-being and individual needs of their team members. A high score on this scale indicates a leader who is empathetic, attentive, and relationship-oriented. They consistently demonstrate concern for both the personal and professional welfare of their team, foster a positive and inclusive work environment, and actively consider employees' perspectives in decision-making. This approach helps build trust, morale, and a sense of being valued, contributing to a supportive team culture. A low score suggests a leader who is less focused on the interpersonal aspects of leadership. They may overlook individual concerns, minimize emotional dynamics, or prioritize tasks over people. While this may result in a more task-driven atmosphere, it can also lead to feelings of neglect or disengagement, potentially affecting employee satisfaction and commitment.`
        },
        {
          facet: 3,
          title: 'Providing Feedback',
          text: `Providing Feedback reflects the extent to which a leader actively offers guidance, reinforcement, and performance-related input to support individual and team development. A high score on this scale indicates a leader who consistently engages in constructive communication, offering timely, specific, and actionable feedback. They balance positive reinforcement with improvement-oriented suggestions, helping team members recognize their strengths and address areas for growth. This approach fosters a culture of continuous learning, accountability, and motivation. A low score suggests a leader who provides limited or infrequent feedback, often avoiding direct performance discussions. While this can create a low-pressure environment, it may also result in missed opportunities for development, uncertainty about expectations, and reduced engagement, as team members may lack clarity on how to improve or feel recognized for their efforts.`
        }
      ]
    },
    E: {
      title: 'Empowering Leadership Approach',
      shortDescription: 'Empowering Leadership Approach measures your approach to encouraging innovative thinking and participative decision-making.',
      description: `Empowering leadership approach emphasizes enabling and motivating team members to take initiative and make decisions, thereby fostering a sense of ownership and commitment within the team. This style of leadership focuses on creating an environment where employees feel confident and capable of contributing meaningfully to organizational goals.
      <br /><br />
      Leaders with high empowering leadership scores actively encourage critical thinking, creative problem-solving, and participation in decision-making. They stimulate intellectual curiosity, challenge conventional thinking, and create space for diverse voices to be heard.
      <br /><br />
      Those with lower empowering leadership scores may prefer a more centralized approach to innovation and decision-making. They might be more comfortable directing the team rather than stimulating independent thinking, potentially limiting creative contributions but providing clearer direction.`,
      facets: [
        {
          facet: 1,
          title: 'Encouraging Innovative Thinking',
          text: `Encouraging Innovative Thinking reflects the extent to which a leader promotes intellectual curiosity, creativity, and independent problem-solving within the team. A high score on this scale indicates a leader who actively challenges conventional thinking and encourages team members to reexamine assumptions, explore new perspectives, and think critically. These leaders foster an environment where it is safe—and expected—to question existing practices, generate original ideas, and solve problems in novel ways. By doing so, they help develop a team that is capable of adapting, innovating, and performing effectively even without direct supervision. A low score suggests a leader who may rely more on established approaches and discourage deviation from traditional methods. They may offer limited opportunities for creative input, potentially stifling learning, innovation, and initiative. Over time, this can lead to a team that is more dependent on the leader and less prepared to navigate complex or unforeseen challenges independently.`
        },
        {
          facet: 2,
          title: 'Participative Decision-Making',
          text: `Participative Decision-Making reflects the extent to which a leader involves team members in shaping decisions, encouraging shared ownership and collaborative problem-solving. A high score on this scale indicates a leader who values input, dialogue, and diverse perspectives. They actively engage team members in decision-making processes, fostering a sense of inclusion, mutual respect, and collective responsibility. This leadership approach supports stronger team alignment, higher motivation, and more innovative outcomes through shared thinking and transparent communication. A low score suggests a leader who tends to make decisions independently or without consulting the team. While this approach may increase speed or control, it can also result in a lack of buy-in, reduced engagement, and missed opportunities to leverage the team's insights. Over time, this may lead to a less collaborative work climate and diminished trust in leadership.`
        }
      ]
    },
    N: {
      title: 'Directive Leadership Approach',
      shortDescription: 'Directive Leadership Approach measures your preferences for authority and independent decision-making.',
      description: `Directive Leadership reflects a leader's ability to assert authority, provide direction, and influence their team with conviction. Leaders who score high on this dimension tend to exhibit an authoritarian leadership style, emphasizing decisiveness, control, and firm guidance, often making independent decisions with minimal input from others. They set high standards and clear expectations, ensuring that tasks are completed efficiently and in alignment with their vision. In contrast, leaders who score low on directive leadership lean toward a democratic leadership style, prioritizing collaboration, shared decision-making, and team involvement. These leaders seek input from their team, foster open communication, and encourage collective problem-solving, placing greater emphasis on flexibility and inclusivity in leadership.
      <br /><br />
      Leaders with high directive leadership scores naturally assume leadership roles, make decisions confidently, and take charge in challenging situations. They are comfortable with authority and responsibility, and operate with conviction in their decisions.
      <br /><br />
      Those with lower directive leadership scores may prefer a more collaborative or egalitarian approach. They might be less comfortable with hierarchical relationships and more inclined to distribute decision-making authority across the team.`,
      facets: [
        {
          facet: 1,
          title: 'Authority',
          text: `Leaders with a high score in authority naturally assume leadership roles, guiding others with clarity and decisiveness. They are comfortable taking responsibility and making important decisions. Their presence often commands respect, and they effectively motivate and direct teams to achieve shared goals. In contrast, a low score in authority suggests a leadership style characterized by an egalitarian approach, where the leader views all team members as equals and minimizes hierarchical distinctions. This leader typically avoids exercising overt control or dominance, instead promoting a collaborative and participatory environment. They prioritize open communication, shared decision-making, and collective responsibility, fostering a sense of partnership among all team members.`
        },
        {
          facet: 2,
          title: 'Independent Decision-Making',
          text: `Leaders with a high score in "independent decision-making" are self-reliant and proactive in handling challenges. They trust their own judgment, make well-informed choices, and do not depend excessively on external validation. They excel in situations where autonomy and initiative are required. In contrast, a low score in independent decision-making indicates a leadership style that leans towards participative decision-making. Leaders with this style prefer to involve team members in the decision-making process rather than relying solely on their own judgment. They seek input, insights, and collaboration from others, valuing diverse perspectives and collective wisdom. This approach enhances team involvement and can lead to more comprehensive and well-rounded decisions by leveraging the expertise and experiences of the entire group. However, it might result in slower decision-making and could be less effective in situations where quick, autonomous action is required.`
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
      domain: 'D', 
      title: domains.D.title, 
      facets: domains.D.facets,
      description: domains.D.shortDescription,
      text: domains.D.description
    },
    { 
      domain: 'T', 
      title: domains.T.title, 
      facets: domains.T.facets,
      description: domains.T.shortDescription,
      text: domains.T.description
    },
    { 
      domain: 'L', 
      title: domains.L.title, 
      facets: domains.L.facets,
      description: domains.L.shortDescription,
      text: domains.L.description
    },
    { 
      domain: 'E', 
      title: domains.E.title, 
      facets: domains.E.facets,
      description: domains.E.shortDescription,
      text: domains.E.description
    },
    { 
      domain: 'N', 
      title: domains.N.title, 
      facets: domains.N.facets,
      description: domains.N.shortDescription,
      text: domains.N.description
    },
    { 
      domain: 'R',
      title: domains.R.title, 
      facets: domains.R.facets,
      description: domains.R.shortDescription,
      text: domains.R.description
    },
    { 
      domain: 'W', 
      title: domains.W.title, 
      facets: domains.W.facets,
      description: domains.W.shortDescription,
      text: domains.W.description
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