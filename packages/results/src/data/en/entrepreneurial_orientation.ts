import { type TemplateDomain } from '../../types'

const entrepreneurialOrientation: TemplateDomain = {
  domain: 'E',
  title: 'Entrepreneurial Orientation',
  shortDescription: 'Entrepreneurial Orientation measures your preferences for autonomy, risk-taking, and innovation in business contexts.',
  description: `Entrepreneurial Orientation reflects your strategic mindset and preferences regarding key entrepreneurial dimensions: autonomy, risk-taking, and innovativeness. This construct has been extensively studied in both individual entrepreneurs and organizations as a predictor of entrepreneurial success.
  <br /><br />
  Individuals with high entrepreneurial orientation value independence in decision-making, are comfortable with calculated risks, and favor innovation over established approaches. They typically encourage autonomous action, are willing to venture into uncertain territory with potential for high returns, and prioritize creative solutions and novel approaches to problems.
  <br /><br />
  Those with lower entrepreneurial orientation prefer more structure and oversight, are more cautious about risks, and tend to favor established approaches over experimental ones. While high entrepreneurial orientation is often associated with venture creation and growth, different levels may be appropriate in different contexts and industries. The most successful entrepreneurs often know when to leverage their entrepreneurial tendencies and when more conservative approaches are warranted.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Your score on Entrepreneurial Orientation is lower, indicating you may prefer more structure and oversight, are cautious about taking risks, and tend to favor established approaches over experimental ones. This orientation may lead you to be more methodical in business decisions, focus on incremental improvements rather than disruptive innovation, and prefer thorough planning before action. While this approach can provide stability and reduce costly mistakes, it may limit opportunities for breakthrough growth. Consider areas where calculated risks and more innovative approaches might yield valuable returns.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Your score on Entrepreneurial Orientation is moderate, suggesting you balance entrepreneurial tendencies with more conservative approaches depending on the context. You likely value some autonomy while appreciating structure, take calculated risks after due consideration, and blend innovative approaches with proven methods. This balanced orientation provides flexibility in different business scenarios, allowing you to pivot between entrepreneurial and more traditional strategies as needed. Continue developing your ability to discern when each approach serves your business objectives best.`
    },
    {
      score: 'high', // do not translate this line
      text: `Your score on Entrepreneurial Orientation is high, indicating you strongly value independence in decision-making, are comfortable with calculated risks, and favor innovation over established approaches. You likely encourage autonomous action, are willing to venture into uncertain territory with potential for high returns, and prioritize creative solutions to problems. This orientation is well-suited to venture creation and growth in dynamic environments, though it's valuable to recognize situations where more conservative approaches may be appropriate. Your entrepreneurial mindset positions you well for identifying and pursuing novel business opportunities.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Autonomy',
      text: `This facet measures how strongly you value and support independent action in business contexts. High scorers encourage individuals and teams to work autonomously and make decisions without constant supervision, while low scorers prefer more centralized decision-making and oversight. Autonomy is important for enabling entrepreneurial initiatives within organizations and empowering team members to pursue innovative ideas, though it requires balance with appropriate coordination and alignment.`
    },
    {
      facet: 2,
      title: 'Risk Taking',
      text: `This facet assesses your comfort level with uncertainty and willingness to commit resources to ventures with uncertain outcomes. High scorers are willing to make bold moves in uncertain environments and commit significant resources despite incomplete information. Low scorers prefer careful, incremental approaches and thorough analysis before committing resources. Entrepreneurial risk-taking involves calculated risks rather than recklessness, balanced with appropriate due diligence and risk management.`
    },
    {
      facet: 3,
      title: 'Innovativeness',
      text: `This facet measures your tendency to favor experimentation, original approaches, and innovation in business contexts. High scorers actively support R&D, new technologies, and novel approaches to problem-solving. Low scorers tend to favor established products, services, and methods with proven track records. Entrepreneurial innovativeness drives the development of new products, services, and business models, though it requires balance with execution excellence and attention to improving existing offerings.`
    }
  ]
}

export default entrepreneurialOrientation