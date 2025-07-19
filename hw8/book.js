class Book {
  static nextId = 0

  constructor(title, author, ISBN, price) {
    this.title = title
    this.author = author
    this.ISBN = ISBN
    this.price = price
    this.availability = true
    this.cart = undefined

    this.id = Book.nextId
    Book.nextId++
  }

  getId() {
    return this.id
  }

  isAvailable() {
    return this.availability
  }

  addToCart(cart) {
    this.availability = false
    this.cart = cart
  }

  removeFromCart() {
    this.availability = true
    this.cart = undefined
  }

  getPrice() {
    return this.price
  }

  getGenre() {
    throw new Error("getGenre() must be implemented by subclass");
  }
}

class FictionBook extends Book {
  constructor(title, author, ISBN, price) {
    super(title, author, ISBN, price)
  }

  getGenre() {
    return 'Fiction'
  }
}

class NonFictionBook extends Book {
  constructor(title, author, ISBN, price) {
    super(title, author, ISBN, price)
  }

  getGenre() {
    return 'Non-Fiction'
  }
}

export { FictionBook, NonFictionBook }
