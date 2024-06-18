import { parseArgs } from 'util'

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
console.log(values)
