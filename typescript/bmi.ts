export default class BMI {
  private readonly weight: number
  private readonly height: number

  constructor(weight: number, height: number) {
    if (weight <= 0 || height <= 0) {
      throw new Error('Weight and height must be positive numbers')
    }
    this.weight = weight
    this.height = height
  }

  get value(): number {
    return this.weight / (this.height * this.height)
  }

  get formattedValue(): string {
    return this.value.toFixed(2)
  }
}
