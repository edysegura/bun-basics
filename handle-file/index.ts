import { file } from 'bun'

const packageJson = file('../package.json')

console.log('name:', packageJson.name)
console.log(await packageJson.text())
