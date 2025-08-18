import { isNumber } from 'lodash'

export class FactorialService {
  static calculate(number: number): number | undefined {
    if (isNumber(number) && number > -1) {
      let result = 1
      for (let i = 1; i <= number; i++) {
        result = result * i
      }
      return result
    }
    return undefined
  }
}
