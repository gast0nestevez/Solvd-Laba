// Task 1

const person = {}
Object.defineProperties(person, {
  firstName: {
    value: 'John',
    writable: false,
    enumerable: true,
  },
  lastName: {
    value: 'Doe',
    writable: false,
    enumerable: true,
  },
  age: {
    value: 30,
    writable: false,
    enumerable: true,
  },
  email: {
    value: 'john.doe@example.com',
    writable: false,
    enumerable: true,
  }
})

Object.defineProperty(person, 'updateInfo', {
  value: function(info) {
    for (const key in info) {
      const descriptor = Object.getOwnPropertyDescriptor(this, key)
      
      if (descriptor.writable) {
        this[key] = info[key]
      }
    }
  },
  writable: false,
})

Object.defineProperty(person, 'address', {
  value: {},
  writable: true,
  configurable: false,
  enumerable: false
})

// Task 2

const product = {}
Object.defineProperties(product, {
  name: {
    value: 'Laptop',
    configurable: true,
  },
  price: {
    value: 1000,
    writable: false,
    enumerable: false,
  },
  quantity: {
    value: 5,
    writable: false,
    enumerable: false,
  }
})

function getTotalPrice(product) {
  const priceDescriptor = Object.getOwnPropertyDescriptor(product, 'price')
  const quantityDescriptor = Object.getOwnPropertyDescriptor(product, 'quantity')

  return priceDescriptor.value * quantityDescriptor.value
}

function deleteNonConfigurable(object, propertyName) {
  const descriptor = Object.getOwnPropertyDescriptor(object, propertyName)
  if (descriptor.configurable) {
    delete object[propertyName]
  } else {
    throw new Error('Cannot delete non-configurable property')
  } 
}

// Task 3

function createBankAccount(initialValue = 1000) {
  return {
    _balance: initialValue,

    get balance() {
      return this._balance
    },

    set balance(value) {
      if (value >= 0)
        this._balance = value
    },

    get formattedBalance() {
      return `$${this._balance}`
    },

    transfer(bankAccount, amount) {
      if (amount > this._balance) {
        console.log('Insufficient funds.')
        return
      }
      this.balance -= amount
      bankAccount.balance += amount
    }
  }
}

const account = createBankAccount()

// Task 4

function createImmutableObject(object) {
  const propertyNames = Object.getOwnPropertyNames(object)
  
  for (const property of propertyNames) {
    const descriptor = Object.getOwnPropertyDescriptor(object, property)

    if (typeof descriptor.value === 'object') {
      createImmutableObject(descriptor.value)
    }

    Object.defineProperty(object, property, {
      ...descriptor,
      writable: false,
      configurable: false
    })
  }

  return object
}

const immutablePerson = createImmutableObject(person)

// Task 5

function observeObject(object, callback) {
  function createProxy(target) {
    return new Proxy(target, {
      get(target, prop, receiver) {
        callback({ type: 'get', property: prop, value: target[prop] })

        const value = Reflect.get(target, prop, receiver)

        if (typeof value === 'object') {
          return createProxy(value)
        }

        return value
      },
      set(target, prop, value, receiver) {
        callback({ type: 'set', property: prop, newValue: value })
        return Reflect.set(target, prop, value, receiver)
      }
    })
  }

  return createProxy(object)
}

const proxyPerson = observeObject(person, (info) => {
  console.log(`Operation: ${info.type}, Property: ${info.property}, Value: ${info.newValue ?? info.value}`)
})

// Task 6

function deepCloneObject(object) {
  function cloneObject(object) {
    const clonedObject = {}
    
    for (const key of Object.keys(object)) {
      const descriptor = Object.getOwnPropertyDescriptor(object, key)
     
      if (typeof descriptor.value === 'object') {
        descriptor.value = cloneObject(descriptor.value)
      }

      Object.defineProperty(clonedObject, key, descriptor)
    }

    return clonedObject
  }

  return cloneObject(object)
}

// Task 7

function validateObject(object, schema) {
  for (const key of Object.keys(schema)) {
    const value = object[key]
    const rules = schema[key]
    
    // If missing property
    if (value === undefined || value === null) {
      // Only ok if it is not required
      if (rules.required)
        return false
    }
    
    if (rules.type) {
      if (rules.type === 'array') {
        if (!Array.isArray(value)) return false
      } 
      else if (typeof value !== rules.type) {
        return false
      }
    }
    
    if (typeof value === 'string') {
      if (rules.minLength !== undefined && value.length < rules.minLength) return false
      if (rules.maxLength !== undefined && value.length > rules.maxLength) return false
      if (rules.pattern && !rules.pattern.test(value)) return false
    }

    if (typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) return false
      if (rules.max !== undefined && value > rules.max) return false
    }
  }

  return true
}

const user = {
  username: 'john_doe',
  password: 'abc123',
  age: 25,
  roles: ['user', 'admin'],
  preferences: { theme: 'dark' }
}

const schema = {
  username: { type: 'string', required: true, minLength: 3 },
  password: { type: 'string', required: true, pattern: /^[A-Za-z0-9]{6,}$/ },
  age: { type: 'number', min: 18 },
  roles: { type: 'array', items: { type: 'string' }, minItems: 1 },
  preferences: {
    type: 'object',
    properties: {
      theme: { type: 'string' }
    }
  }
}

console.log(validateObject(user, schema))
