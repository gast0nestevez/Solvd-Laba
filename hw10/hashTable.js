const LOAD_FACTOR_THRESHOLD = 0.7

export class CustomHashTable {
  constructor(size) {
    this.table = new Array(size).fill(null).map(() => [])
    this.tableSize = size
    this.count = 0
  }

  hash(key) {
    let hash = 5381
    for (let i = 0; i < key.length; i++) {
      hash <<= i<<3
      hash ^= (key.charCodeAt(i) << 5)
      //const charCode = key.charCodeAt(i)
      //hash = ((hash << 5) + hash) ^ charCode  // hash * 33 ^ char
    }
    return Math.abs(hash) % this.tableSize
  }

  insert(key, value) {
    const index = this.hash(key)
    const bucket = this.table[index]

    // If key is already present, overwrite
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value
        return
      }
    }

    // Insert as new
    bucket.push([key, value])
    
    // Check load factor
    this.count++
    if (this._loadFactor() > LOAD_FACTOR_THRESHOLD) {
      this._resize()
    }
  }

  get(key) {
    const index = this.hash(key)
    const bucket = this.table[index]

    for (const pair of bucket) {
      if (pair[0] === key) return pair[1]
    }
  }

  delete(key) {
    const index = this.hash(key)
    const bucket = this.table[index]
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1)
        this.count--
        return
      }
    }
  }

  getAllKeys() {
    const keys = []
    this.table.forEach(bucket => {
      for (const [key, _] of bucket) {
        keys.push(key)
      }
    })

    return keys
  }

  _loadFactor() {
    return this.count / this.tableSize
  }

  _resize() {
    const oldTable = this.table
    this.tableSize = this._nextPrime(this.tableSize * 2)
    this.table = new Array(this.tableSize).fill(null).map(() => [])
    this.count = 0

    // Reinsert all elements into the new table
    for (const bucket of oldTable) {
      for (const [key, value] of bucket) {
        this.insert(key, value)
      }
    }
  }

  _nextPrime(n) {
    const isPrime = num => {
      if (num < 2) return false
      for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false
      }
      return true
    }

    while (!isPrime(n)) {
      n++
    }

    return n
  }
}

// Create an instance of CustomHashTable and demonstrate its usage...
const table = new CustomHashTable(101)

table.insert('abc', 1)
table.insert('bca', 2)
table.insert('cab', 3)

console.log(table.get('abc')) // 1
console.log(table.get('bca')) // 2
console.log(table.get('cab')) // 3

table.delete('cab')
console.log(table.get('cab')) // undefined
console.log(table.get('bca')) // 2

for (let i = 0; i < 400; i++) {
  table.insert(`${i}`, Math.random())
}
console.log('#Elements:', table.getAllKeys().length) // #Elements: 402
