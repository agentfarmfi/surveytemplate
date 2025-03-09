import { type TemplateDomain } from '../../types'

const socialOrientations: TemplateDomain = {
  domain: 'S',
  title: 'Social Orientations',
  shortDescription: 'Social Orientations measures your tendencies in interpersonal exchanges, particularly whether you lean more toward taking (self-focused) or giving (other-focused) behaviors.',
  description: `Social orientations in the context of interpersonal and organizational behavior describe individuals' predispositions towards interacting with others, focusing on how they balance self-interests with the interests of others.
  <br /><br />
  Individuals with a stronger taker orientation prioritize their personal needs, are wary of others taking advantage of them, and are strategic about helping others only when it benefits them. Those with a stronger giver orientation are more concerned with others' needs, believe in helping without keeping score, and often go beyond equal exchanges to be more generous in their contributions.
  <br /><br />
  Both orientations can be successful in entrepreneurship depending on context. Taker tendencies can help protect personal interests and ensure fair treatment, while giver tendencies can build stronger networks, enhance team cohesion, and create positive reputations. The most effective entrepreneurs often develop a nuanced understanding of when each approach is most appropriate and beneficial.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Your score on Social Orientations indicates a stronger taker tendency, suggesting you prioritize your own interests in workplace relationships. You may be cautious about helping others without clear benefits to yourself and wary of being taken advantage of in exchanges. While this orientation can help protect your interests and ensure you're not exploited, it may limit opportunities for building strong collaborative networks and reputation-based advantages. Being more strategic about when to incorporate giving behaviors could enhance your entrepreneurial effectiveness in relationship-building.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Your score on Social Orientations is balanced, indicating you blend taker and giver tendencies depending on the situation. You likely consider both your own interests and those of others in workplace relationships, and are capable of flexible approaches to reciprocity. This balanced orientation provides versatility in entrepreneurial contexts, allowing you to protect your interests while also building collaborative relationships. Continue developing your ability to discern when each orientation serves you best in different business contexts.`
    },
    {
      score: 'high', // do not translate this line
      text: `Your score on Social Orientations indicates a stronger giver tendency, suggesting you often prioritize others' needs and interests in workplace relationships. You're likely generous with your time and resources without expecting immediate returns, and may find satisfaction in contributing to others' success. This orientation can be valuable for building strong networks, developing loyal teams, and establishing a positive reputation, all assets in entrepreneurship. Just ensure your giving is sustainable and doesn't lead to burnout or exploitation of your generosity.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Self-interest (taker)',
      text: `Self-interest refers to the extent to which individuals focus on their own interests, benefits, and well-being in their decision-making and behaviors. Individuals high in self-interest are motivated by factors that benefit themselves directly. They are likely to engage in behaviors that are expected to lead to personal gains, such as bonuses, promotions, or recognition. Individuals low in self-interest do not prioritize their personal gains very strongly. They may still consider personal benefits but are less driven by these considerations compared to those with high self-interest. Their actions may be less influenced by personal rewards or losses.`
    },
    {
      facet: 2,
      title: 'Reciprocation wariness (taker)',
      text: `This mindset involves caution in returning help, motivated by the fear of being taken advantage of. Individuals with high reciprocation wariness are skeptical of others' intentions in social exchanges and tend to guard against overextending themselves to avoid exploitation. Individuals with high levels of reciprocation wariness are very cautious about returning help, especially when there is a risk of being exploited. They may return help in smaller proportions than received, or only reciprocate when absolutely necessary, to minimize the chance of others taking advantage of their generosity. Those with low reciprocation wariness are less concerned about being exploited and more willing to return help freely. They tend to trust others' intentions more and are comfortable reciprocating generously without fearing negative consequences.`
    },
    {
      facet: 3,
      title: 'Other orientation (giver)',
      text: `Other-orientation refers to the extent to which individuals prioritize the needs, interests, and welfare of others in their decision-making and behaviors. Individuals with high other-orientation are characterized by their attentiveness to how their actions affect their colleagues and the broader group. They may prioritize the goals and well-being of the group or organization over their personal gains. Other-orientation is essentially about being socially considerate and cooperative, focusing on collective over individual success, and is often associated with traits like empathy, altruism, and prosocial behavior. Individuals with low other-orientation are less concerned with the effects of their actions on others. They are less likely to factor in the well-being or interests of their peers or the group outcomes in their decision-making processes.`
    },
    {
      facet: 4,
      title: 'Creditor ideology (giver)',
      text: `This mindset reflects a belief in the strategic advantage of over-reciprocating help received. Individuals who subscribe to the creditor ideology tend to return more help than they have received, anticipating that this will obligate others to them and lead to more generous repayments in the future. Individuals who strongly hold creditor ideologies are proactive in returning more help than they receive. They view their actions as investments that will yield future benefits, expecting that those they help will feel a stronger obligation to assist them later. Those with a low creditor ideology do not emphasize over-reciprocating. They may adhere more strictly to an equal exchange of help or may not believe in the strategic benefits of placing others in their debt. They tend to reciprocate only as much help as they have received, without attempting to manipulate future reciprocation.`
    }
  ]
}

export default socialOrientations