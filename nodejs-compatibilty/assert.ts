import { assert } from 'node:console'

type Foo = {
  bar?: number
}

function morphFoo(foo: Foo): number {
  assert(foo.bar !== undefined, 'foo.bar must exist')
  return foo.bar * 5
}

console.log(morphFoo({ bar: 10 }))
console.log(morphFoo({}))
