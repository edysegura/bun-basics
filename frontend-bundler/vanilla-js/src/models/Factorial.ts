import { isNumber } from 'lodash'

export class Factorial {
  private readonly value: number

  constructor(number: number) {
    if (!this.isValidNumber(number)) {
      throw new Error(
        'Factorial can only be calculated for non-negative integers',
      )
    }
    this.value = number
  }

  private isValidNumber(number: number): boolean {
    return (
      isNumber(number) &&
      !isNaN(number) &&
      Number.isInteger(number) &&
      number >= 0
    )
  }

  calculate(): number {
    if (this.value === 0 || this.value === 1) {
      return 1
    }

    let result = 1
    for (let i = 1; i <= this.value; i++) {
      result = result * i
    }
    return result
  }

  getValue(): number {
    return this.value
  }

  static from(number: number): Factorial {
    return new Factorial(number)
  }

  static calculate(number: number): number | undefined {
    try {
      return new Factorial(number).calculate()
    } catch {
      return undefined
    }
  }
}
