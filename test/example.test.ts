import { expect, test } from 'bun:test'

test('it should work', () => {
  expect(1 + 1).toBe(2)
})

test('it should work async', async () => {
  const response = await fetch('https://example.com/')
  expect(response.ok).toBe(true)
})

test('it should return 404', async () => {
  const response = await fetch('https://httpbin.org/status/404')
  expect(response.status).toBe(404)
})

// bun test
// bun test --watch
// bun test --coverage
// bun test example.test.ts
