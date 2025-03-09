import { type TemplateDomain } from '../../types'

const riskTolerance: TemplateDomain = {
  domain: 'R',
  title: 'Risk Tolerance',
  shortDescription: 'Risk Tolerance measures your comfort level with uncertainty and willingness to take calculated risks.',
  description: `Risk Tolerance is a critical trait for entrepreneurship that reflects your 
  willingness to make decisions under uncertainty and take calculated risks. People with 
  high risk tolerance are comfortable with ambiguity and see potential loss as a natural 
  part of business ventures. They view setbacks as learning opportunities rather than 
  failures.
  <br /><br />
  Individuals with high risk tolerance are willing to invest time, money, and reputation 
  in ventures with uncertain outcomes. They can make decisions with incomplete information 
  and navigate volatile market conditions. This trait is essential for entrepreneurship, 
  as starting and growing businesses inherently involves risk and uncertainty.
  <br /><br />
  People with low risk tolerance prefer stability and certainty. They are more 
  cautious in their decision-making and may struggle in highly uncertain business 
  environments. While risk aversion can prevent costly mistakes, it may also cause 
  missed opportunities for growth and innovation.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Your score on Risk Tolerance is low, indicating you prefer stability and 
      certainty in business situations. You tend to be cautious and may avoid taking chances 
      even when potential rewards are high. While this approach helps you avoid potential 
      losses, it may cause you to miss valuable opportunities. You might be more comfortable 
      in structured environments with clear rules and predictable outcomes.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Your score on Risk Tolerance is moderate, suggesting you balance caution with a 
      willingness to take calculated risks. You can make decisions with some uncertainty but 
      prefer to have substantial information before committing resources. You're generally 
      comfortable with moderate risk when the potential rewards justify it, but you may 
      hesitate when facing highly uncertain situations or when significant resources are at stake.`
    },
    {
      score: 'high', // do not translate this line
      text: `Your score on Risk Tolerance is high, indicating you're comfortable with uncertainty 
      and willing to take calculated risks. You view potential setbacks as learning opportunities 
      rather than failures, and you're willing to invest time, money, and reputation in ventures 
      with uncertain outcomes. This trait is highly valuable in entrepreneurship, as you can make 
      decisions with incomplete information and see opportunities where others focus on risks.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Uncertainty Comfort',
      text: `This facet measures how comfortable you feel in ambiguous or uncertain situations. 
      High scorers thrive in dynamic environments where outcomes are unpredictable, while low 
      scorers prefer clear structure and predictability. Entrepreneurs with high uncertainty 
      comfort can navigate changing market conditions and make decisions without complete information, 
      an essential capability in the constantly evolving business landscape.`
    },
    {
      facet: 2,
      title: 'Financial Risk-Taking',
      text: `This facet assesses your willingness to risk financial resources in business 
      ventures. High scorers are comfortable investing personal funds or taking on debt for 
      business opportunities, while low scorers are more financially conservative. Financial 
      risk-taking is often necessary for entrepreneurial ventures, though balanced with 
      prudent financial management. Your approach to financial risk significantly impacts 
      your entrepreneurial options and growth potential.`
    },
    {
      facet: 3,
      title: 'Resilience to Failure',
      text: `This facet measures how you respond to setbacks and failure. High scorers view 
      failures as learning experiences and are willing to face criticism when pursuing bold 
      ideas. Low scorers are more discouraged by setbacks and may avoid situations where 
      failure is possible. Entrepreneurial success often requires resilience through multiple 
      failures and adjustments, making this trait particularly valuable in the startup world 
      where iteration and pivoting are common.`
    }
  ]
}

export default riskTolerance