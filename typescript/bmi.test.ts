import { describe, expect, test } from 'bun:test'

import BMI from './bmi'

describe('BMI class', () => {
  test('calculates BMI value correctly', () => {
    const bmi = new BMI(70, 1.75) // 70kg, 1.75m
    expect(bmi.value).toBeCloseTo(22.857, 3)
    expect(bmi.formattedValue).toBe('22.86')
  })

  test('throws error for non-positive weight', () => {
    expect(() => new BMI(0, 1.75)).toThrow(
      'Weight and height must be positive numbers',
    )
    expect(() => new BMI(-5, 1.75)).toThrow(
      'Weight and height must be positive numbers',
    )
  })

  test('throws error for non-positive height', () => {
    expect(() => new BMI(70, 0)).toThrow(
      'Weight and height must be positive numbers',
    )
    expect(() => new BMI(70, -1.8)).toThrow(
      'Weight and height must be positive numbers',
    )
  })
})
