import { readdir } from 'fs/promises'
const languagePath = './src/data'
const isFolder = (item: string): boolean => item !== 'languages.ts'
const expectedFiles = [
  'entrepreneurial_orientation.ts',
  'index.ts',
  'psychological_capital.ts',
  'social_orientations.ts',
  'work_goal_orientations.ts'
]

it('it has all files in language folder', async () => {
  const langs = await readdir(languagePath)
  const langFolders = langs.filter(isFolder)
  const paths = langFolders.map((folder: string) => `${languagePath}/${folder}`)
  const allFiles = await Promise.all(paths.map(async (path: string) => await readdir(path)))
  allFiles.forEach(files => {
    expect(files).toEqual(expectedFiles)
  })
})
