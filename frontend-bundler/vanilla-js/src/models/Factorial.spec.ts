import { describe, expect, it } from 'bun:test'
import { Factorial } from './Factorial'

describe('Factorial.ts', () => {
  it('should create Factorial instances with valid numbers', () => {
    const factorial = new Factorial(5)
    expect(factorial.getValue()).toBe(5)
    expect(factorial.calculate()).toBe(120)
  })

  it('should handle edge cases correctly', () => {
    const factorial0 = new Factorial(0)
    expect(factorial0.calculate()).toBe(1)

    const factorial1 = new Factorial(1)
    expect(factorial1.calculate()).toBe(1)
  })

  it('should throw error for invalid numbers', () => {
    expect(() => new Factorial(-1)).toThrow(
      'Factorial can only be calculated for non-negative integers',
    )
    expect(() => new Factorial(NaN)).toThrow(
      'Factorial can only be calculated for non-negative integers',
    )
  })

  it('should provide static factory method', () => {
    const factorial = Factorial.from(3)
    expect(factorial).toBeInstanceOf(Factorial)
    expect(factorial.calculate()).toBe(6)
  })

  it('should provide static calculate method', () => {
    expect(Factorial.calculate(3)).toBe(6)
    expect(Factorial.calculate(0)).toBe(1)
    expect(Factorial.calculate(-1)).toBeUndefined()
  })
})
