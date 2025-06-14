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
