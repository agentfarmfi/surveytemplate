import { type TemplateDomain } from '../../types'

const psychologicalCapital: TemplateDomain = {
  domain: 'P',
  title: 'Psychological Capital',
  shortDescription: 'Psychological Capital measures your positive psychological state of development characterized by self-efficacy, optimism, resilience, and hope.',
  description: `Psychological capital refers to an individual's positive psychological state of development that is characterized by: having confidence (self-efficacy) to take on and put in the necessary effort to succeed at challenging tasks; making a positive attribution (optimism) about succeeding now and in the future; persevering toward goals and, when necessary, redirecting paths to goals (hope) in order to succeed; and when beset by problems and adversity, sustaining and bouncing back and even beyond (resilience) to attain success.
  <br /><br />
  Individuals with high Psychological Capital believe in their abilities, expect positive outcomes, can generate multiple pathways to achieve their goals, and bounce back quickly from setbacks. These psychological resources are critical for entrepreneurial success as they help navigate the challenges, uncertainties, and setbacks inherent in entrepreneurial endeavors.
  <br /><br />
  People with low Psychological Capital may doubt their abilities, expect negative outcomes, struggle to find alternative paths to goals, and have difficulty recovering from setbacks. Lower levels of these psychological resources may make entrepreneurial journeys more challenging, as they can amplify the perceived difficulties and reduce perseverance.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Your score on Psychological Capital is low, indicating you may struggle with confidence in your abilities, tend to expect negative outcomes, find it difficult to generate multiple pathways to achieve goals, and recover slowly from setbacks. This psychological profile may make entrepreneurial challenges seem more daunting and reduce your persistence in the face of obstacles. Developing your psychological resources through mindfulness practices, cognitive reframing, and incremental goal-setting may help you build your capacity to navigate entrepreneurial challenges.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Your score on Psychological Capital is moderate, suggesting you have a balanced psychological profile with reasonable confidence in your abilities, moderately positive expectations, some capacity to generate alternative pathways to goals, and moderate resilience in the face of setbacks. This balanced profile provides a foundation for entrepreneurial endeavors, though there may be room to strengthen these psychological resources further. Working on areas where you feel less confident may help you build a more robust psychological toolkit for entrepreneurial challenges.`
    },
    {
      score: 'high', // do not translate this line
      text: `Your score on Psychological Capital is high, indicating strong confidence in your abilities, positive expectations for the future, capacity to generate multiple pathways to achieve goals, and quick recovery from setbacks. This psychological profile provides a robust foundation for entrepreneurial success, as you're likely to persevere through challenges, maintain motivation despite obstacles, and adapt effectively to changing circumstances. Your psychological resources will serve as valuable assets throughout your entrepreneurial journey.`
    }
  ],
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
}

export default psychologicalCapital