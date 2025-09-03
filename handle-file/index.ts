import { file as fileReader } from 'bun'

const packageJson = fileReader('../package.json')

console.log('name:', packageJson.name)
console.log(await packageJson.text())
