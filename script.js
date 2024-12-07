// Initialize variables to store current number, previous number, and operator
let currentNumber = ''
let previousNumber = ''
let operator = ''

// Wait for DOM content to load before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons on the calculator
    const buttons = document.querySelectorAll('button')
    // Add event listener to each button
    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            // Call handleInput function with the text content of the clicked button
            handleInput(button.textContent)
        })
    })
})

// Function to handle user input
function handleInput(input) {
    const screen = document.getElementById('screen') // Get the calculator screen element
    switch (input) {
        case 'C':
            // Clear all variables and reset screen
            currentNumber = ''
            previousNumber = ''
            operator = ''
            screen.value = ''
            break
        case '←':
            // Remove last character from current number and update screen
            if (currentNumber) {
                currentNumber = currentNumber.slice(0, -1)
            }
            else if (operator) {
                operator = operator.slice(0, -1)
            }
            else {
                previousNumber = previousNumber.slice(0, -1)
            }
            screen.value = formatDisplay()
            break
        case '+':
        case '-':
        case '×':
        case '÷':
            if (currentNumber) {
                if (operator) {
                    // If there's already an operator, calculate the result first
                    previousNumber = calculate(previousNumber, currentNumber, operator).toString()
                    currentNumber = ''
                } else {
                    previousNumber += currentNumber
                    currentNumber = ''
                }
            }
            operator = input

            screen.value = formatDisplay()
            break
        case '=':
            if (currentNumber && previousNumber && operator) {
                // Calculate result and display on screen
                currentNumber = calculate(previousNumber, currentNumber, operator).toString()
                screen.value = currentNumber
            previousNumber = ''
                operator = ''
            } 
            break
        default:
            if (!isNaN(input)) {
                // Append number to currentNumber and update screen
                currentNumber += input
                screen.value = formatDisplay()
            }
    }
}

// Function to format display with current calculation
function formatDisplay() {
    return `${previousNumber}${operator}${currentNumber}`.trim()
}

// Function to perform arithmetic calculations
function calculate(num1, num2, op) {
    let number1 = parseFloat(num1)
    let number2 = parseFloat(num2)
    switch (op) {
        case '+':
            return number1 + number2
        case '-':
            return number1 - number2
        case '×':
            return number1 * number2
        case '÷':
            return number1 / number2
        default:
            return 0
    }
}


