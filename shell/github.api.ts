import { $ } from 'bun'

const response = await fetch('https://api.github.com/users/edysegura')
const data: Record<string, undefined> = await response.json()

await $`echo ${'Name: ' + data.name}`
await $`echo ${'Public repos: ' + data.public_repos}`
await $`echo ${'Followers: ' + data.followers}`
await $`echo ${'Since: ' + data.created_at}`
