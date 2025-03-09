import { type TemplateDomain } from '../../types'

const workGoalOrientations: TemplateDomain = {
  domain: 'W',
  title: 'Work Goal Orientations',
  shortDescription: 'Work Goal Orientations measures your approach to challenges, learning, and performance in work contexts.',
  description: `Work goal orientations refer to the attitudes and predispositions individuals hold regarding the purpose and outcomes of their efforts and achievements at work. These orientations influence how individuals approach tasks, set goals, and respond to challenges and feedback in the workplace.
  <br /><br />
  Individuals with strong learning orientations seek out challenges that will develop their skills, view difficulties as learning opportunities, and are intrinsically motivated by mastery. Those with strong competitive performance orientations focus on demonstrating their abilities to others, comparing their performance favorably to peers, and gaining recognition for their competence. Those with strong avoidance orientations prioritize avoiding situations where they might appear incompetent, protecting their image over learning new skills.
  <br /><br />
  In entrepreneurial contexts, learning orientations support innovation, adaptation, and resilience through failures. Competitive performance orientations can drive high standards and achievement, while excessive avoidance orientations may limit risk-taking and innovation. Successful entrepreneurs often leverage learning orientations when facing novel challenges while balancing healthy performance standards.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Your score on Work Goal Orientations indicates a predominant avoidance tendency, suggesting you may prioritize protecting your image over learning new skills or demonstrating your competence. You may avoid challenging situations where you risk appearing incompetent, which could limit your entrepreneurial growth opportunities. Consider gradually expanding your comfort zone by taking on increasingly challenging tasks in supportive environments, focusing on the learning process rather than outcomes, and reframing "failures" as valuable feedback for improvement.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Your score on Work Goal Orientations is balanced, indicating you likely blend different approaches depending on the situation. You show elements of learning orientation (seeking mastery), performance orientation (demonstrating competence), and some caution about situations where you might appear incompetent. This balanced profile provides flexibility in entrepreneurial contexts, though you might benefit from strengthening your learning orientation further to enhance innovation and resilience. Consider which orientation serves you best in different business contexts.`
    },
    {
      score: 'high', // do not translate this line
      text: `Your score on Work Goal Orientations indicates a strong learning orientation, suggesting you actively seek challenges that develop your skills, view difficulties as opportunities to learn, and are intrinsically motivated by mastery. This orientation is highly valuable for entrepreneurship, supporting innovation, adaptation to changing circumstances, and resilience through inevitable setbacks. Your growth mindset will serve you well in navigating the complex challenges of entrepreneurial ventures and continuously improving your capabilities.`
    }
  ],
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
}

export default workGoalOrientations