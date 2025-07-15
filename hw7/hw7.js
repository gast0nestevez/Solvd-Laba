// Task 1

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = []
    let resolvedCount = 0

    if (promises.length === 0) {
      return resolve([])
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          // Keep order of promises
          results[index] = value
          resolvedCount++

          if (resolvedCount === promises.length) {
            resolve(results)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}

// Task 2

function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    const results = []
    let settledCount = 0
    
    if (promises.length === 0) {
      resolve(results)
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: 'fulfilled', value }
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason }
        })
        .finally(() => {
          settledCount++
          if (settledCount === promises.length) {
            resolve(results)
          }
        })
    })
  })
}

// Task 3

function chainPromises(functions) {
  return functions.reduce((prevPromise, currentFn) => {
    return prevPromise.then(currentFn)
  }, Promise.resolve())
}

// Task 4

function promisify(callback) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      callback(...args, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }
}
