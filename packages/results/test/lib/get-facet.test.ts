import { getFacet } from '../../src'

it('returns expected result', async () => {
  const result = await getFacet({ language: 'en', domain: 'p', facet: '1' })
  expect(result).toHaveProperty('text')
})
