import { $ } from 'bun'

const text = await $`ls ../`.text()

console.log(text)
