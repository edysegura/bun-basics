import { $ } from 'bun'

const response = await fetch('https://api.github.com/users/edysegura')
const json = await response.json()

await $`echo ${'Name: ' + json.name}`
