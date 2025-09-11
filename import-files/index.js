import htmlFile from './files/index.html' with { type: "text" }
import jsonFile from '../package.json'
import yamlFile from './files/config.yaml'

console.log('---> HTML File')
console.log(htmlFile)

console.log('---> JSON File')
console.log(jsonFile.name, 'is private:', jsonFile.private)

console.log('---> YAML File')
console.log(`${yamlFile.database.host}:${yamlFile.database.port}`)