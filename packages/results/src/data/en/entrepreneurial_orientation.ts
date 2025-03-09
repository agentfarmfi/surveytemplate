import { type TemplateDomain } from '../../types'

const entrepreneurialOrientation: TemplateDomain = {
  domain: 'E',
  title: 'Entrepreneurial Orientation',
  shortDescription: 'Entrepreneurial Orientation measures your preferences for autonomy, risk-taking, and innovation in business contexts.',
  description: `Entrepreneurial orientation refers to a specific state of mind which orients human conduct towards entrepreneurial activities and outcomes. Individuals with an entrepreneurial mindset are often characterized by their willingness to innovate, take risks, and seize opportunities that others might pass up.
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

export default entrepreneurialOrientation