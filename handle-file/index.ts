import { file as fileReader, write as fileWriter } from 'bun'

const packageJson = fileReader('../package.json')

console.log('name:', packageJson.name)
console.log(await packageJson.text())

await fileWriter('./log.txt', `[${Date.now()}] - Hi there!`)
const fileLog = fileReader('./log.txt')
console.log('log:', await fileLog.text())
