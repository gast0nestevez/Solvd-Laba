/*
# Homework 3

### **Task 1: Immutability and Pure Functions**

1. Implement a pure function called `calculateDiscountedPrice` that takes an array of products and a discount
percentage as arguments. The function should return a new array of products with discounted prices based on the given
percentage, without modifying the original products.
2. Create a pure function called `calculateTotalPrice` that takes an array of products as an argument. The function
should return the total price of all products, without modifying the original array or its items.
*/

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

/* 
### **Task 2: Function Composition and Point-Free Style**

1. Implement a function called `getFullName` that takes a person object with `firstName` and `lastName` properties.
The function should return the person's full name in the format "FirstName LastName".
2. Create a function called `filterUniqueWords` that takes a string of text and returns an array of unique words,
sorted in alphabetical order, without using explicit loops. Use function composition and point-free style.
3. Implement a function called `getAverageGrade` that takes an array of student objects, each containing a `name` and
`grades` property. The function should return the average grade of all students, without modifying the original
array or its items. Use function composition and point-free style.
*/

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
/*
### **Task 3: Closures and Higher-Order Functions**

1. Create a function called `createCounter` that returns a closure. The closure should be a counter function that
increments the count on each call and returns the updated count. Each closure should have its own independent count.
2. Implement a higher-order function called `repeatFunction` that takes a function and a number as arguments.
The function should return a new function that invokes the original function multiple times based on the provided number.
If the number is negative, the new function should invoke the original function indefinitely until stopped.
*/

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

/*
### **Task 4: Recursion and Tail Call Optimization**

1. Implement a recursive function called `calculateFactorial` that calculates the factorial of a given number.
Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.
2. Create a recursive function called `power` that takes a base and an exponent as arguments.
The function should calculate the power of the base to the exponent using recursion.
*/

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

/*
### **Task 5: Lazy Evaluation and Generators (do not use yield)**

1. Implement a lazy evaluation function called `lazyMap` that takes an array and a mapping function.
The function should return a lazy generator that applies the mapping function to each element of the array one at a time.
2. Create a lazy generator function called `fibonacciGenerator` that generates Fibonacci numbers one at a time using lazy evaluation.
*/

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