function sumArrays(a, b) {
  if (a.length !== b.length) {
    throw new Error('Arrays must be the same size')
  }
  return a.map((val, i) => val + b[i])
}

function addValues(a, b) {
  let res = undefined

  // Arithmetic addition 
  if (typeof a === 'number') {
    res = a + convertToNumber(b)
  }
  // String concatenation
  else if (typeof a === 'string') {
    res = a + stringifyValue(b)
  }
  // Array concatenation
  else if (Array.isArray(a) && Array.isArray(b)) {
    res = sumArrays(a, b)
  }
  // I've decided to omit boolean values, as I don't see any meaningful addition operation applicable to them

  if (typeof res === 'undefined') {
    throw new Error('Unsupported types')
  }
  return res
}

function stringifyValue(value) {
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

function invertBoolean(value) {
  if (typeof value !== 'boolean') {
    throw new Error('Value must be a boolean')
  }
  return !value
}

function convertToNumber(value) {
  const num = Number(value)
  if (isNaN(num)) throw new Error('Invalid cast')
  return num
}

function coerceToType(value, type) {
  switch (type) {
    case 'boolean':
      return Boolean(value)

    case 'string':
      return stringifyValue(value)

    case 'number':
      return convertToNumber(value)

    case 'array':
      if (Array.isArray(value)) return value
      return [value]

    default:
      throw new Error(`Unsupported type coercion to ${type}`)
  }
}

console.log('-------- TESTS --------')

console.log('addValues(2, 3) ->', addValues(2, 3))
console.log('addValues(2, "8") ->', addValues(2, "8"))
console.log('addValues(2, true) ->', addValues(2, true))
console.log('addValues("Hello", " world!") ->', addValues('Hello', ' world!'))
console.log('addValues("Value: ", 60) ->', addValues('Value: ', 60))
console.log('addValues("Value: ", false) ->', addValues('Value: ', false))
console.log('addValues([1, 2], [3, 4]) ->', addValues([1, 2], [3, 4]))

console.log('-----------------------')

console.log('stringifyValue(5) ->', stringifyValue(5))
console.log('stringifyValue(true) ->', stringifyValue(true))
console.log('stringifyValue("10") ->', stringifyValue('10'))
console.log('stringifyValue({a: 1, b: 2, c: 3}) ->', stringifyValue({a: 1, b: 2, c: 3}))

console.log('-----------------------')

console.log('invertBoolean(false) ->', invertBoolean(false))
console.log('invertBoolean(true) ->', invertBoolean(true))
console.log('invertBoolean(true && false) ->', invertBoolean(true && false))

console.log('-----------------------')

console.log('convertToNumber(10) ->', convertToNumber(10))
console.log('convertToNumber("10") ->', convertToNumber('10'))
console.log('convertToNumber(false) ->', convertToNumber(false))

console.log('-----------------------')

console.log('coerceToType(1, "boolean") ->', coerceToType(1, 'boolean'))
console.log('coerceToType(0, "boolean") ->', coerceToType(0, 'boolean'))
console.log('coerceToType("1", "number") ->', coerceToType('1', 'number'))
console.log('coerceToType(3.14, "string") ->', coerceToType(3.14, 'string'))
console.log('coerceToType("6", "array") ->', coerceToType('6', 'array'))

console.log('-----------------------')

module.exports = {
  addValues,
  stringifyValue,
  invertBoolean,
  coerceToType
}
