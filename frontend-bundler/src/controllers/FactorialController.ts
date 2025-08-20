import { Factorial } from '../models/Factorial'

export class FactorialController {
  constructor() {
    this.listenButtonClick()
  }

  showResult(result: number = 0): void {
    const span = document.getElementById('result') as HTMLSpanElement
    if (span) {
      span.textContent = result.toString()
    }
  }

  getNumber(): number {
    const inputNumber = document.getElementById('number') as HTMLInputElement
    if (inputNumber) {
      return +inputNumber.value
    }
    return 0
  }

  clickHandler(event: Event): void {
    event.preventDefault()
    const result = Factorial.calculate(this.getNumber())
    if (result !== undefined) {
      this.showResult(result)
    }
  }

  listenButtonClick(): void {
    const form = document.querySelector('form') as HTMLFormElement
    if (form) {
      form.addEventListener('submit', (event: Event) =>
        this.clickHandler(event),
      )
    }
  }
}
