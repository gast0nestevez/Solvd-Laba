// Task 1

function customFilterUnique(array, callback) {
  const filteredArray = array.filter(callback)
  const uniqueArray = [...new Set(filteredArray)]

  return uniqueArray
}

const apple  = { name: 'apple', color: 'red' }
const banana = { name: 'banana', color: 'yellow' }
const orange = { name: 'orange', color: 'orange' }
const tomato = { name: 'tomato', color: 'red' }

const fruits = [apple, banana, orange, tomato, apple]
const isRedFruit = (fruit) => fruit.color === 'red'
console.log('Original array:', fruits)

const filteredArray = customFilterUnique(fruits, isRedFruit)
console.log('Filtered array:', filteredArray)

// Task 2

function chunkArray(array, chunkSize) {
  const chunkedArray = []
  let chunk = []

  for (let i = 0; i < array.length; i += chunkSize) {
    chunk = createNewChunk(array, i, chunkSize)
    chunkedArray.push(chunk)
  }
  return chunkedArray
}

function createNewChunk(array, arrayIndex, chunkSize) {
  const chunk = []

  for (let chunkIndex = 0; chunkIndex < chunkSize; chunkIndex++) {
    const index = arrayIndex + chunkIndex
    if (index >= array.length) break

    chunk.push(array[index])
  }
  return chunk
}

// Task 3

// Efficient Fisher–Yates algorithm
// Reference: https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
function customShuffle(array) {
  let j = 0
  for (let i = array.length-1; i > 0; i--) {
    j = getRandomArbitrary(0, i)
    swap(array, i, j)
  }
  return array
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function swap(array, i, j) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

// Task 4

function getArrayIntersection(array1, array2) {
  const elementsInArr1 = {}
  for (elem of array1) {
    elementsInArr1[elem] = true
  }

  const intersectionArray = []
  for (elem of array2) {
    if (elementsInArr1[elem]) {
      intersectionArray.push(elem)
    }
  }

  return intersectionArray
}

function getArrayUnion(array1, array2) {
  return [...new Set([...array1, ...array2])]
}

// Task 5

function measureArrayPerformance(array, fn) {
  const startTime = performance.now()    
  fn(array)
  const endTime = performance.now()
  console.log(`${endTime - startTime} milliseconds`)
}

const mapTestFunction = (array) => array.map(x => x * 2)
const filterTestFunction = (array) => array.filter(x => x % 2 === 0)
const reduceTestFunction = (array) => array.reduce((acc, val) => acc + val, 0)

// Large array to test
const testArray = Array.from({ length: 1_000_000 }, (_, i) => i)
measureArrayPerformance(testArray, mapTestFunction)
measureArrayPerformance(testArray, filterTestFunction)
measureArrayPerformance(testArray, reduceTestFunction)
