import { type TemplateDomain } from '../../types'

const psychologicalCapital: TemplateDomain = {
  domain: 'P',
  title: 'Psychological Capital',
  shortDescription: 'Psychological Capital measures your positive psychological state of development characterized by self-efficacy, optimism, resilience, and hope.',
  description: `Psychological Capital represents your positive psychological state of development that is characterized by: having confidence (self-efficacy) to take on and put in the necessary effort to succeed at challenging tasks; making a positive attribution (optimism) about succeeding now and in the future; persevering toward goals and, when necessary, redirecting paths to goals (hope) in order to succeed; and when beset by problems and adversity, sustaining and bouncing back and even beyond (resilience) to attain success.
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
      text: `This facet measures your confidence in your ability to mobilize the motivation, cognitive resources, and courses of action needed to successfully execute specific tasks within given contexts. High scorers believe strongly in their capabilities to achieve their goals and perform effectively on different tasks, even in challenging circumstances. Low scorers doubt their abilities and may avoid difficult challenges. Self-efficacy is critical for entrepreneurs as it influences how much effort they put into ventures, how long they persist when facing obstacles, and their resilience to adversity.`
    },
    {
      facet: 2,
      title: 'Optimism',
      text: `This facet assesses your tendency to expect positive outcomes and attribute success to internal, permanent, and pervasive causes, while attributing failures to external, temporary, and situation-specific factors. High scorers generally expect good things to happen and maintain a positive outlook even in difficult situations. Low scorers expect negative outcomes and attribute failures to internal, permanent factors. Entrepreneurial optimism helps maintain motivation through challenges and setbacks while identifying opportunities that others might miss.`
    },
    {
      facet: 3,
      title: 'Resilience',
      text: `This facet measures your ability to bounce back from adversity, uncertainty, conflict, failure, or even positive change and increased responsibility. High scorers recover quickly from setbacks and adapt to changing circumstances with minimal disruption. Low scorers struggle to overcome challenges and may be derailed by failures. Entrepreneurial resilience is essential for navigating the inevitable ups and downs of business ventures and provides the psychological strength to persist despite obstacles.`
    },
    {
      facet: 4,
      title: 'Hope',
      text: `This facet assesses your belief in your ability to find pathways to desired goals and your motivation to use those pathways. High scorers can generate multiple routes to achieve their goals and maintain the motivation to pursue these paths. Low scorers struggle to identify alternative approaches to goals and may lose motivation when facing obstacles. Entrepreneurial hope enables creative problem-solving, adaptability to changing circumstances, and persistent pursuit of goals despite challenges.`
    }
  ]
}

export default psychologicalCapital