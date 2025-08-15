import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { JSDOM } from 'jsdom'
import { FactorialController } from './FactorialController'

// Set up JSDOM before all tests
beforeAll(() => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
  })

  // Make DOM APIs available globally
  global.document = dom.window.document
  global.window = dom.window
  global.navigator = dom.window.navigator
})

describe('FactorialController.ts', () => {
  let controller: FactorialController

  beforeEach(() => {
    // Set up document body before each test
    document.body.innerHTML = `
      <form action="">
        <input type="text" id="number">
        <button type="submit">Calculate</button>
        <span id="result">0</span>
      </form>
    `
    controller = new FactorialController()
  })

  it('should show the result on the HTML element', () => {
    // GIVEN
    const result = 2

    // AND
    const htmlElement = document.getElementById('result')

    // WHEN
    controller.showResult(result)

    // THEN
    expect(htmlElement?.textContent).toBe('2')
  })

  it('should get a value from input as a number', () => {
    // GIVEN
    const inputElement = document.getElementById('number') as HTMLInputElement
    if (inputElement) {
      inputElement.value = '2'
    }

    // WHEN
    const number = controller.getNumber()

    // THEN
    expect(number).toBe(2)
  })

  it('should calculate factorial from a given number', () => {
    // GIVEN
    const inputElement = document.getElementById('number') as HTMLInputElement
    if (inputElement) {
      inputElement.value = '5'
    }

    // AND
    const button = document.querySelector('button') as HTMLButtonElement
    const htmlElement = document.getElementById('result')

    // WHEN
    if (button) {
      button.click()
    }

    // THEN
    expect(htmlElement?.textContent).toBe('120')
  })

  it('should have zero as a default value showing result', () => {
    // GIVEN
    const htmlElement = document.getElementById('result')

    // WHEN
    controller.showResult()

    // THEN
    expect(htmlElement?.textContent).toBe('0')
  })
})
