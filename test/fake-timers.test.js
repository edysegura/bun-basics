import { expect, jest, test } from 'bun:test'

test('fake timers', () => {
  jest.useFakeTimers()
  const callback = jest.fn()

  setTimeout(callback, 1000)
  expect(callback).not.toBeCalled()

  // jest.advanceTimersByTime(1000)
  jest.runAllTimers()
  expect(callback).toHaveBeenCalled()

  jest.useRealTimers()
})
