import { parseArgs } from 'node:util'

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    flag1: {
      type: 'boolean',
    },
    flag2: {
      type: 'string',
    },
  },
  strict: true,
  allowPositionals: true,
})

console.table(Bun.argv)
console.table(process.argv)
console.log(JSON.stringify(values))

// how to run
// bun run command-line-args.ts --flag1 --flag2="Edy Segura"
