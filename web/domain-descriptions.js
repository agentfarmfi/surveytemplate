// Updated domain descriptions for generateResult function
const domains = {
  P: {
    title: 'Psychological Capital',
    shortDescription: 'Psychological Capital measures your positive psychological state of development characterized by self-efficacy, optimism, and resilience.',
    description: `Psychological capital refers to an individual's positive psychological state of development that is characterized by: having confidence (self-efficacy) to take on and put in the necessary effort to succeed at challenging tasks; making a positive attribution (optimism) about succeeding now and in the future; and when beset by problems and adversity, sustaining and bouncing back and even beyond (resilience) to attain success.
    <br /><br />
    Individuals with high Psychological Capital believe in their abilities, expect positive outcomes, and bounce back quickly from setbacks. These psychological resources are critical for entrepreneurial success as they help navigate the challenges, uncertainties, and setbacks inherent in entrepreneurial endeavors.
    <br /><br />
    People with low Psychological Capital may doubt their abilities, expect negative outcomes, and have difficulty recovering from setbacks. Lower levels of these psychological resources may make entrepreneurial journeys more challenging, as they can amplify the perceived difficulties and reduce perseverance.`,
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
      }
    ]
  },
  S: {
    title: 'Social Orientations',
    shortDescription: 'Social Orientations measures your tendencies in interpersonal exchanges, particularly whether you lean more toward taking (self-focused) or giving (other-focused) behaviors.',
    description: `A prosocial approach refers to the motivation and behaviors oriented towards benefiting others. This approach encompasses actions and initiatives taken by individuals or groups to help, support, or advance the well-being of others, often transcending self-interest or personal gains.
    <br /><br />
    Individuals with a stronger self-concern orientation prioritize their personal needs and are strategic about helping others only when it benefits them. Those with stronger other-orientation are more concerned with others' needs and believe in helping without keeping score.
    <br /><br />
    Both orientations can be successful depending on context. Self-concern tendencies can help protect personal interests and ensure fair treatment, while other-orientation tendencies can build stronger networks, enhance team cohesion, and create positive reputations.`,
    facets: [
      {
        facet: 1,
        title: 'Self-concern',
        text: `Self-concern refers to the extent to which individuals focus on their own interests, benefits, and well-being in their decision-making and behaviors. Individuals with high self-concern are primarily motivated by outcomes that benefit themselves, such as achieving personal gains, rewards, or recognition. This orientation involves a focus on personal success and achievement, often considering how actions will impact one's own status, resources, or welfare. In contrast, individuals who score low in self-concern do not prioritize their personal gains very strongly. They may still consider personal benefits but are less driven by these considerations compared to those with high self-concern. Their actions may be less influenced by personal rewards or losses.`
      },
      {
        facet: 2,
        title: 'Reciprocation wariness (Taker)',
        text: `Reciprocal wariness is a mindset that involves caution in returning help, motivated by the fear of being taken advantage of. Individuals with high reciprocation wariness are skeptical of others' intentions in social exchanges and tend to guard against overextending themselves to avoid exploitation. They are very cautious about returning help, especially when there is a risk of being exploited. They may return help in smaller proportions than received, or only reciprocate when absolutely necessary, to minimize the chance of others taking advantage of their generosity. In contrast, those with low reciprocation wariness are less concerned about being exploited and more willing to return help freely. They tend to trust others' intentions more and are comfortable reciprocating generously without fearing negative consequences.`
      },
      {
        facet: 3,
        title: 'Other-orientation',
        text: `Other-orientation refers to the extent to which individuals prioritize the needs, interests, and welfare of others in their decision-making and behaviors. Individuals with high other-orientation are characterized by their attentiveness to how their actions affect their colleagues and the broader group. They may prioritize the goals and well-being of the group or organization over their personal gains. Other-orientation is essentially about being socially considerate and cooperative, focusing on collective over individual success, and is often associated with traits like empathy, altruism, and prosocial behavior. Individuals with low other-orientation are less concerned with the effects of their actions on others. They are less likely to factor in the well-being or interests of their peers or the group outcomes in their decision-making processes.`
      },
      {
        facet: 4,
        title: 'Creditor ideology (Giver)',
        text: `Creditor ideology reflects a belief in the strategic advantage of over-reciprocating help received. Individuals who score high to the creditor ideology tend to return more help than they have received, anticipating that this will obligate others to them and lead to more generous repayments in the future. In contrast, those with a low creditor ideology do not emphasize over-reciprocating. They may adhere more strictly to an equal exchange of help or may not believe in the strategic benefits of placing others in their debt. They tend to reciprocate only as much help as they have received, without attempting to manipulate future reciprocation.`
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
    In entrepreneurial contexts, learning orientations support innovation, adaptation, and resilience through failures. Performance orientations can drive high standards and achievement, while excessive avoidance orientations may limit risk-taking and innovation.`,
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
  E: {
    title: 'Entrepreneurial Orientation',
    shortDescription: 'Entrepreneurial Orientation measures your preferences for autonomy, risk-taking, and innovation in business contexts.',
    description: `Entrepreneurial orientation refers to the behaviors and attitudes of individuals, particularly within the context of their work environment or career pursuits. It represents a personal inclination towards entrepreneurial behaviors that can manifest in various settings, including within organizations, in personal businesses, or in broader life decisions. 
    <br /><br />
    Individuals with high entrepreneurial orientation value independence in decision-making, are comfortable with calculated risks, and favor innovation over established approaches. They typically encourage autonomous action, are willing to venture into uncertain territory with potential for high returns, and prioritize creative solutions and novel approaches to problems.
    <br /><br />
    Those with lower entrepreneurial orientation prefer more structure and oversight, are more cautious about risks, and tend to favor established approaches over experimental ones. While high entrepreneurial orientation is often associated with venture creation and growth, different levels may be appropriate in different contexts and industries.`,
    facets: [
      {
        facet: 1,
        title: 'Autonomy',
        text: `Autonomy reflects a person's preference for self-direction and independence in their work. It involves the desire and ability to make decisions without excessive external influence or control, fostering a sense of ownership and responsibility towards one's own projects and tasks. Individuals with high autonomy prefer working environments where they can decide for themselves what opportunities to pursue and make decisions without constantly referring to supervisors. Those with low autonomy prefer more structured environments where management plays a major role in decision-making.`
      },
      {
        facet: 2,
        title: 'Risk Taking',
        text: `Risk taking captures an individual's propensity to engage in actions that have uncertain outcomes. It includes the willingness to take calculated risks in pursuit of career advancement, innovation, and personal or professional growth, even when such actions might lead to failure or setbacks. Individuals with high risk-taking are willing to pursue projects with uncertain outcomes and don't require complete information before taking action. Those with low risk-taking prefer a cautious, "wait-and-see" approach, methodical analysis, and careful incremental behavior.`
      },
      {
        facet: 3,
        title: 'Innovativeness',
        text: `Innovativeness refers to an individual's inclination to think creatively and outside the conventional frameworks. It involves the pursuit of new ideas, the application of creative solutions to problems, and the readiness to embrace change and technological advancements to improve one's work or personal achievements. Individuals with high innovativeness favor experimentation and original approaches to problem-solving rather than relying on established methods. Those with low innovativeness prefer tried-and-tested approaches and are more likely to imitate methods that others have used successfully.`
      }
    ]
  },
  C: {
    title: 'Cognitive Style',
    shortDescription: 'Cognitive Style measures your approach to processing information, solving problems, and making decisions.',
    description: `Cognitive style is the individual way a person perceives, thinks, learns, solves problems, and relates to others. Individual differences in cognitive styles influence perception, learning, problem solving, decision making, communication, and creativity in important ways. 
    <br /><br />
    Cognitive style defines the way people process and organize information and arrive at judgments or conclusions on the basis of their observations. It also defines how people perceive stimuli and how they use this information to guide their behavior (i.e., thinking, feeling, actions).
    <br /><br />
    People with different cognitive styles approach problems, decision-making, and information processing in fundamentally different ways. Some may rely heavily on logic and analysis, others on structure and planning, while others emphasize creativity and generating new possibilities.`,
    facets: [
      {
        facet: 1,
        title: 'Knowing style',
        text: `People with a knowing style look for facts and data. They want to know exactly the way things are and tend to retain many facts and details. They like complex problems if they can find a clear and rational solution. People with a high score on knowing style emphasizes logic, objectivity, and precision. Those with low scores on knowing style may be less interested in detailed analysis and may prefer a more intuitive or emotional approach to understanding problems.`
      },
      {
        facet: 2,
        title: 'Planning style',
        text: `People with a planning style are characterized by a need for structure. Planners like to organize and control and prefer a well-structured work environment. They attach importance to preparation and planning to reach their objectives. People with a high score on planning style emphasizes structure, control, and routines. Those with low scores on planning style may prefer more flexibility and spontaneity, being less concerned with detailed preparation and more comfortable with ambiguity.`
      },
      {
        facet: 3,
        title: 'Creating style',
        text: `People with a creating style tend to be creative and like experimentation. They see problems as opportunities and challenges, and they like uncertainty and freedom. People with a high score on a creating style emphasizes subjectivity, impulsivity, and openness to possibilities. Those with low scores on creating style may prefer established routines and conventional approaches, being less interested in innovation for its own sake.`
      }
    ]
  }
};