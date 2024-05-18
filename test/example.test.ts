/*
 * This is an example test file.
 * You can run this test by running `bun test` in your terminal.
 */
import { test, expect } from 'bun:test'

test('it should work', () => {
  expect(1 + 1).toBe(2)
})

test('it should work async', async () => {
  const response = await fetch('https://example.com/')
  expect(response.ok).toBe(true)
})
