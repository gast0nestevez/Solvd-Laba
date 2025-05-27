/*
# Homework 1

Perform arithmetic operations on strings without relying on bigint or arithmetic libraries.
The operations should function as string functions, considering only positive integers
(you can avoid negative numbers, all numbers will be positive and integer).

`String.plus(string) => string`

`String.minus(string) => string`

`String.divide(string) => string`

`String.multiply(string) => string`
*/

function performArithmetic(leftOperand, rightOperand, operation) {
  const result = operation(parseInt(leftOperand), parseInt(rightOperand))
  return result.toString()
}

String.prototype.plus = function(operand) {
  return performArithmetic(this, operand, (a, b) => a + b)
}

String.prototype.minus = function(operand) {
  return performArithmetic(this, operand, (a, b) => a - b)
}

String.prototype.divide = function(operand) {
  return performArithmetic(this, operand, (a, b) => a / b)
}

String.prototype.multiply = function(operand) {
  return performArithmetic(this, operand, (a, b) => a * b)
}

console.log("3 + 7 =", "3".plus("7"))
console.log("5 - 3 =", "5".minus("3"))
console.log("8 / 2 =", "8".divide("2"))
console.log("4 * 3 =", "4".multiply("3"))

// I do not validate the parameter or things related to the operation (divide by zero, for example) 
// because I assume it is not the purpose of the task
