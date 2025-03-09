export interface Language {
  code: string
  name: string
}

export type LanguageCode = 'en'

const languages: Language[] = [
  {
    code: 'en',
    name: 'English'
  }
]

export default languages
