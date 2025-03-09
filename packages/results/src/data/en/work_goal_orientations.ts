import { type TemplateDomain } from '../../types'

const workGoalOrientations: TemplateDomain = {
  domain: 'W',
  title: 'Work Goal Orientations',
  shortDescription: 'Work Goal Orientations measures your approach to challenges, learning, and performance in work contexts.',
  description: `Work Goal Orientations reflect your tendencies in how you approach work tasks, challenges, and opportunities for development. This dimension examines whether you primarily focus on learning and mastery, demonstrating your competence to others, or avoiding situations where you might appear incompetent.
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
      text: `This facet measures your tendency to seek out challenges, develop new skills, and view difficulties as learning opportunities. High scorers are intrinsically motivated by mastery and personal development, while low scorers are less interested in challenge for the sake of growth. A strong learning orientation is particularly valuable for entrepreneurs, as it supports innovation, adaptation to changing circumstances, and resilience through inevitable failures.`
    },
    {
      facet: 2,
      title: 'Competitive performance orientation',
      text: `This facet assesses your focus on demonstrating your abilities to others and being recognized for your competence. High scorers are concerned with how their performance compares to others and enjoy public recognition of their accomplishments. Low scorers are less concerned with external validation and comparisons. While a competitive orientation can drive high standards and achievement, excessive focus on outperforming others can undermine collaboration and increase fear of failure.`
    },
    {
      facet: 3,
      title: 'Avoidance orientation',
      text: `This facet measures your tendency to avoid situations where you might appear incompetent or demonstrate low ability. High scorers prioritize protecting their image over learning new skills or taking on challenges with uncertain outcomes. Low scorers are less concerned about appearing incompetent when trying something new. An avoidance orientation can significantly limit entrepreneurial potential by reducing risk-taking, innovation, and the ability to learn from failures.`
    }
  ]
}

export default workGoalOrientations