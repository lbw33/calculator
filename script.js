class Calculator {
  //takes all inputs and functions for the calculator
  //need to know where to place the display text for the calculator
  constructor(previousOperandTextElement, currentOperandTextElement) {
    //provides a way yo set these elements from inside the class
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    //starts the calculator off with an empty display and no operand selected
    this.clear()
  }
  //function to clear the display
  clear() {
    //sets currentOperand and previousOperand to empty string
    this.currentOperand = ''
    this.previousOperand = ''
    //sets the operand to undefined as no operand selected
    this.operation = undefined
  
  }
  //function to delete inputted element
  delete() {
    //turns current operand into a string and chops off the last element
    this.currentOperand = this.currentOperand.toString().slice(0, -1)

  }
  //function to add a number to the display
  appendNumber(number) {
    //this checks to see if display has a decimal point. Will only allow one.
    if (number === '.' && this.currentOperand.includes('.')) return
    //turned the numbers into a string as we want 1 and 1 to be 11 not 2
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  //function to add an operand to the display
  chooseOperation(operation) {
    //if statement to check if empty and wont let other code execute
    if (this.currentOperand === '') return
    //if statement to check if there is a previous and current compute if so
    if (this.previousOperand !== '') {
      this.compute()
    }
    //assign the operation passed in
    this.operation = operation
    //when we choose an new operand, it replaces the previous one as we are now done with it
    this.previousOperand = this.currentOperand
    //clears current operand
    this.currentOperand = ''

  }
  //function to calculate the display
  compute() {
    //variable to store the answer
    let computation
    //constant variables to turn into a number
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    //checks if user hasn't entered anything and wont run code 
    if (isNaN(previous) || isNaN(current)) return
    //switch statement to handle the calcualtion logic
    switch (this.operation) {
      case '+' :
        computation = previous + current
        break
      case '-' :
        computation = previous - current
        break
      case '*' :
        computation = previous * current
        break
      case '÷' :
        computation = previous / current
        break
        //default = else
      default:
        return
    }
    //sets currentOperand to equal the answer amount
    this.currentOperand = computation
    //sets the operation to nothing as no operation
    this.operation = undefined
    //sets the previous operand to nil - awaiting user to input
    this.previousOperand = ''
  }

  //helper function
  getDisplayNumber(number) {
    //sets number to string so that decimal can be handled correctly
    const stringNumber = number.toString()
    //splits string on decimal - array = [integer digits, decimal digits]
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    //happens when nothing on screen or just a decimal place used
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      //handles adding in commas using locale string 'en'
      integerDisplay = integerDigits.toLocaleString('en', {
        //sets 0 decimal places after the whole number - no decimals
        maximumFractionDigits: 0 })
    }
    //if there are decimal digits then format to include
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  //function that allows the display to update
  updateDisplay() {
    this.currentOperandTextElement.innerText =
    this.getDisplayNumber(this.currentOperand)
    //checks to see if current operation is null, if not appends to end of string on previousOperandTextElement
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
      `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

// gets all number buttons using querySelectorAll and then specify which elements you want.
const numberButtons = document.querySelectorAll('[data-number]')
// gets all operation buttons using querySelectorAll and then specify which elements you want.
const operationButtons = document.querySelectorAll('[data-operation]')
// gets equals button using querySelector.
const equalsButton = document.querySelector('[data-equals]')
// gets delete button using querySelector.
const deleteButton = document.querySelector('[data-delete]')
// gets all clear button using querySelector.
const allClearButton = document.querySelector('[data-all-clear]')
// gets previous operand text element using querySelector.
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
// gets all operation buttons using querySelectorAll and then specify which elements you want.
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//initialize new version of calculator class to a variable
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
//loops over the buttons
numberButtons.forEach(button => {
  //adds a click listener to see when a button is clicked
  button.addEventListener('click', () => {
    //appends number to calculator display using the button's text (i.e. 1, 2, 3 etc.)
    calculator.appendNumber(button.innerText)
    //updates the display which appended number
    calculator.updateDisplay()
  })
});

//same as above but for operation buttons
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
});

//listens for a click on the equals button
equalsButton.addEventListener('click', button => {
  //calls the compute function
  calculator.compute()
  //updates the display
  calculator.updateDisplay()
})

//same as above but for all clear button
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

//same as above but for all clear button
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})