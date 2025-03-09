import { type TemplateDomain } from '../../types'

const planning: TemplateDomain = {
  domain: 'P',
  title: 'Planning & Execution',
  shortDescription: 'Planning & Execution measures your ability to set goals, develop actionable plans, and follow through consistently.',
  description: `Planning & Execution refers to the ability to set clear goals, create 
  structured plans, and systematically execute those plans to achieve desired outcomes. 
  People scoring high on this domain are organized, methodical, and disciplined in their 
  approach to business. They break large objectives into manageable milestones, track 
  progress, and consistently follow through on commitments.
  <br /><br />
  In entrepreneurship, effective planning and execution are crucial for transforming 
  innovative ideas into reality. Strong planners establish clear objectives, anticipate 
  potential obstacles, develop contingency plans, and monitor performance metrics to 
  ensure progress. They balance adherence to plans with flexibility when conditions change, 
  adapting strategies based on results.
  <br /><br />
  Individuals scoring low on this domain may take a more spontaneous and flexible approach 
  to business. While they might be quick to adapt to changing circumstances, they may 
  struggle with consistency, follow-through, and systematic implementation. Entrepreneurial 
  success typically requires balancing creative vision with disciplined execution.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Your score on Planning & Execution is low, suggesting you take a more spontaneous 
      and flexible approach to business activities. You may prefer to adapt as you go rather 
      than follow detailed plans. While this approach gives you agility, you might sometimes 
      struggle with consistency and follow-through. Entrepreneurial ventures often require 
      structured implementation, so developing more systematic planning habits could enhance 
      your effectiveness in turning ideas into reality.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Your score on Planning & Execution is moderate, indicating you balance structure 
      with flexibility. You can create plans when needed but aren't rigidly bound to them. 
      You're likely able to set reasonable goals and work toward them with adequate consistency, 
      while still adapting when circumstances change. This balanced approach allows you to 
      implement business ideas with sufficient structure while remaining responsive to new 
      information and opportunities.`
    },
    {
      score: 'high', // do not translate this line
      text: `Your score on Planning & Execution is high, indicating you're systematic and 
      disciplined in your approach to business activities. You set clear goals, create 
      structured plans, and consistently follow through on commitments. This methodical 
      approach is valuable in entrepreneurship, as you can translate innovative ideas into 
      reality through careful planning and persistent execution. You likely monitor progress, 
      anticipate obstacles, and adjust strategies based on results.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Goal Setting',
      text: `This facet measures your ability to establish clear, specific objectives and 
      prioritize tasks effectively. High scorers set well-defined goals and organize activities 
      based on their importance to those goals. Low scorers may set vaguer targets or shift 
      priorities frequently. Effective goal setting provides direction and focus for 
      entrepreneurial efforts.`
    },
    {
      facet: 2,
      title: 'Strategic Planning',
      text: `This facet assesses how you develop plans to achieve your objectives. High scorers 
      create detailed plans before starting projects and set ambitious but achievable targets. 
      Low scorers may prefer to improvise and adjust as they go. Strategic planning helps 
      entrepreneurs efficiently allocate resources and coordinate activities toward business 
      objectives.`
    },
    {
      facet: 3,
      title: 'Performance Monitoring',
      text: `This facet examines how you track progress and use performance data. High scorers 
      regularly monitor metrics and adjust strategies based on results. Low scorers may take a 
      less systematic approach to measuring progress. Effective entrepreneurs use performance 
      data to identify issues early and make informed adjustments to their business approach.`
    },
    {
      facet: 4,
      title: 'Execution Discipline',
      text: `This facet measures your consistency in following through on plans and commitments. 
      High scorers execute with determination, meet deadlines, and hold themselves accountable. 
      Low scorers may struggle with consistent implementation or prefer to experiment rather than 
      follow established processes. Disciplined execution is crucial for translating entrepreneurial 
      vision into tangible business outcomes.`
    }
  ]
}

export default planning