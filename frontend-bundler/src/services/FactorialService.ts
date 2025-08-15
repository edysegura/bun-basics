export class FactorialService {
  static isValidNumber(number: number): boolean {
    // prettier-ignore
    return number !== undefined
      && typeof number === 'number'
      && number > -1
  }

  static calculate(number: number): number | undefined {
    if (FactorialService.isValidNumber(number)) {
      let result = 1
      for (let i = 1; i <= number; i++) {
        result = result * i
      }
      return result
    }
    return undefined
  }
}
