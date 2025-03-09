import { type TemplateDomain } from '../../types'

const innovation: TemplateDomain = {
  domain: 'I',
  title: 'Innovation',
  shortDescription: 'Innovation measures your ability to generate original ideas and creative solutions to business problems.',
  description: `Innovation is the ability to think creatively and develop novel solutions 
  to existing problems. Highly innovative individuals regularly generate new ideas, 
  challenge conventional thinking, and see connections that others miss. They are 
  curious, open to different perspectives, and comfortable reimagining established 
  products, services, and processes.
  <br /><br />
  In the entrepreneurial context, innovation involves identifying unmet needs in the 
  market, spotting trends before they become obvious, and developing unique approaches 
  to business challenges. Innovators are willing to experiment with different solutions 
  until they find what works, combining existing ideas in novel ways and questioning 
  industry assumptions.
  <br /><br />
  People scoring low on innovation tend to prefer established methods and conventional 
  approaches. They may excel at implementing and refining existing solutions rather than 
  creating entirely new ones. While they might be less likely to develop breakthrough 
  innovations, they can be valuable in stabilizing and optimizing business operations.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Your score on Innovation is low, suggesting you prefer conventional approaches and 
      established methods. You tend to focus on implementing and refining existing solutions 
      rather than creating entirely new ones. While you may not regularly generate radically 
      new ideas, you likely excel at making incremental improvements to established processes. 
      In entrepreneurial settings, you might be more comfortable joining existing businesses 
      or working with proven business models.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Your score on Innovation is moderate, indicating you balance creative thinking with 
      practical considerations. You can generate new ideas when needed but also value proven 
      approaches. You're able to identify opportunities for improvement in existing systems 
      and occasionally develop novel solutions. Your balanced approach allows you to innovate 
      selectively, focusing your creative efforts on areas with the greatest potential impact.`
    },
    {
      score: 'high', // do not translate this line
      text: `Your score on Innovation is high, indicating you regularly generate original ideas 
      and creative solutions. You naturally question conventional wisdom, spot unmet needs in 
      the market, and see connections that others miss. This innovative mindset is a valuable 
      entrepreneurial asset, enabling you to develop distinctive products or services and solve 
      complex business problems. You're likely comfortable reimagining established processes 
      and exploring entirely new approaches.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Creative Ideation',
      text: `This facet measures your ability to generate original ideas and see possibilities 
      where others don't. High scorers regularly think of novel concepts, make connections 
      between seemingly unrelated fields, and imagine new products or services that don't 
      currently exist. Low scorers tend to think more conventionally and may focus on improving 
      existing ideas rather than creating entirely new ones. Creative ideation is fundamental 
      to entrepreneurial innovation, allowing individuals to envision solutions that others 
      haven't considered.`
    },
    {
      facet: 2,
      title: 'Practical Application',
      text: `This facet assesses how you apply creativity to solve real-world business problems 
      and implement innovative ideas. High scorers can transform abstract concepts into practical 
      solutions, experiment with different approaches, and challenge conventional industry practices 
      to find better ways of doing business. Low scorers may struggle to translate creative ideas 
      into workable solutions or prefer to stick with established methods. Successful entrepreneurs 
      combine creative thinking with practical application to bring innovative concepts to market.`
    }
  ]
}

export default innovation