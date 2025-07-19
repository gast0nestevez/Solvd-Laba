import test from 'node:test'
import assert from 'node:assert'
import User from './user.js'
import { FictionBook, NonFictionBook } from './book.js'

// Some tests for basic functionality

test('Users can add books to cart', () => {
  const user = new User('John', 'john.smith@example.com')
  const book1 = new FictionBook('The Little Prince', 'Antoine de Saint-Exupéry', '9780156013987', 9)
  const book2 = new NonFictionBook('One Hundred Years of Solitude', 'Gabriel García Márquez', '9780060883287', 14.50)

  user.addToCart(book1)
  user.addToCart(book2)
  assert.deepStrictEqual(user.cart.books, [book1, book2])
})

test('Users can remove books from cart', () => {
  const user = new User('John', 'john.smith@example.com')
  const book1 = new FictionBook('The Little Prince', 'Antoine de Saint-Exupéry', '9780156013987', 9)
  const book2 = new NonFictionBook('One Hundred Years of Solitude', 'Gabriel García Márquez', '9780060883287', 14.50)

  user.addToCart(book1)
  user.addToCart(book2)
  user.removeFromCart(book1)
  assert.deepStrictEqual(user.cart.books, [book2])
})

test('Throws error when trying to add unavailable books', () => {
  const user1 = new User('John', 'john.smith@example.com')
  const user2 = new User('Emily', 'emily.johnson@example.com')
  const book = new FictionBook('1984', 'George Orwell', '9780451524935', 11.25)
  
  user1.addToCart(book)
  assert.throws(() => user2.addToCart(book))
  assert.deepStrictEqual(user1.cart.books, [book])
  assert.deepStrictEqual(user2.cart.books, [])
})

test('Users can place orders', () => {
  const user = new User('John', 'john.smith@example.com')
  const book = new FictionBook('1984', 'George Orwell', '9780451524935', 11.25)
  
  user.addToCart(book)
  user.placeOrder()
  assert.deepStrictEqual(user.orders.at(0).books, [book])
  assert.deepStrictEqual(user.cart.books, [])
})
