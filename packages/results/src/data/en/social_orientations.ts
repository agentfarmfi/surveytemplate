import { type TemplateDomain } from '../../types'

const socialOrientations: TemplateDomain = {
  domain: 'S',
  title: 'Social Orientations',
  shortDescription: 'Social Orientations measures your tendencies in interpersonal exchanges, particularly whether you lean more toward taking (self-focused) or giving (other-focused) behaviors.',
  description: `Social Orientations reflect your tendencies in interpersonal exchanges and relationships within work and business contexts. This dimension examines whether you primarily focus on your own interests (taker) or on the interests of others (giver) in social interactions, as well as your expectations around reciprocity in relationships.
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
      text: `This facet measures how strongly you prioritize your own needs, goals, and interests in workplace contexts. High scorers are very attuned to their personal aspirations and needs, while low scorers may neglect their own interests. A healthy focus on self-interest is necessary for entrepreneurial success and sustainable leadership, though excessive self-focus can undermine relationship-building and team effectiveness.`
    },
    {
      facet: 2,
      title: 'Reciprocation wariness (taker)',
      text: `This facet assesses your caution about interdependent relationships and concern about being exploited or disadvantaged in exchanges. High scorers are wary of helping others without clear benefits and careful about accepting help that might create obligations. Low scorers are more comfortable with interdependence and less concerned about imbalanced exchanges. Some reciprocation wariness can protect entrepreneurs from exploitation, though excessive wariness may limit valuable collaborative opportunities.`
    },
    {
      facet: 3,
      title: 'Other orientation (giver)',
      text: `This facet measures how strongly you consider and prioritize the needs, goals, and interests of others in workplace contexts. High scorers are highly attuned to others' aspirations and concerns, while low scorers may be less aware of or concerned with others' needs. A strong other orientation can enhance entrepreneurial leadership through team motivation and stakeholder relationship management, though it requires balance with self-interest for sustainability.`
    },
    {
      facet: 4,
      title: 'Creditor ideology (giver)',
      text: `This facet assesses your tendency to give more than you receive in exchanges and relationships. High scorers prefer to be the more generous party in exchanges and feel obligated to return favors with even greater assistance. Low scorers aim for equal exchanges or may prefer to receive more than they give. Creditor ideology can help entrepreneurs build strong networks and reputations for generosity, though it should be balanced with self-protection to avoid exploitation.`
    }
  ]
}

export default socialOrientations