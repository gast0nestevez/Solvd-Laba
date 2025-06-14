// Task 1

// Here, for simplicity, a product is just its price
const calculateDiscountedPrice = (products, discount) => products.map(product => product * (1 - discount))

/*
const products = [10, 20, 30]
const discount = 0.20
console.log('Original:', products)
console.log(`With discount of ${discount*100}%:`, calculateDiscountedPrice(products, discount))
*/

const calculateTotalPrice = (products) => products.reduce((sum, product) => sum + product, 0) 

//console.log('Total price of all products:', calculateTotalPrice(products))

// Task 2

function getFullName(person) {
  return `${person.firstName} ${person.lastName}`
}

/*
const person = {
  firstName: 'Gastón',
  lastName: 'Estevez'
}
console.log(getFullName(person))
*/

const pipe = (...functions) => x => functions.reduce((v, f) => f(v), x)

const filterUniqueWords = pipe(
  text => text.toLowerCase().match(/\w+/g),
  words => [...new Set(words)],
  uniqueWords => uniqueWords.sort()
)

//console.log(filterUniqueWords('dog, cat, elephant, dog, bird'))

const getAverageGrade = pipe(
  students => students.map(student => student.grades),
  grades => grades.reduce((sum, grade) => sum + grade, 0) / grades.length
)

/*
const Student = (name, grades) => ({ name, grades })
const students = [
  Student('Maria', 9),
  Student('Juan', 7),
  Student('Pablo', 8)
]
console.log('Average grades:', getAverageGrade(students))
*/

// Task 3

function createCounter() {
  let value = 0
  function counter() {
    return value++
  }
  return counter
}

//const counter = createCounter()
//console.log(counter())
//console.log(counter())

function repeatFunction(f, reps) {
  function applyMultipleTimes() {
    for(let i=0; i!==reps; i++) {
      f()
    }
  }
  return applyMultipleTimes
}

//const fiveHelloWorlds = repeatFunction(() => console.log('Hello World!'), 5)
//fiveHelloWorlds()

// Task 4

function calculateFactorial(n) {
  if (n <= 1) return 1
  
  const result = n * calculateFactorial(n-1)
  return result
}

//console.log(calculateFactorial(8))

function power(base, exponent) {
  if (exponent < 1) return 1

  const result = base * power(base, exponent-1)
  return result
}

//console.log(power(2,9))

// Task 5

function lazyMap(array, f) {
  const n = array.length
  let index = 0

  function next() {
    // Starts all over at the end
    index = index % n
    const mappedElement = f(array[index])
    index++

    return mappedElement
  }

  return next
}

/*
const next = lazyMap([1,2,3,4,5], (n) => n*7)
console.log(next())
console.log(next())
*/

function fibonacciGenerator() {
  let a = 0
  let b = 1
  
  function next() {
    const value = a
    a = b
    b = value + b

    return value
  }

  return next
}

/*
const fiboGenerator = fibonacciGenerator()
console.log(fiboGenerator())
console.log(fiboGenerator())
console.log(fiboGenerator())
*/
