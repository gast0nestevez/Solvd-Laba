import Order from './order.js'

class Cart {
  constructor(user) {
    this.owner = user
    this.books = []
  }

  addBook(book) {
    if (!book.isAvailable())
      throw new Error('Book unavailable')

    book.addToCart(this)
    this.books.push(book)
  }

  removeBook(bookToRemove) {
    const index = this.books.findIndex(book => book.getId() === bookToRemove.getId())
    if (index !== -1) {
      bookToRemove.removeFromCart()
      this.books.splice(index, 1)
    }
  }

  placeOrder() {
    if (this.isEmpty()) return

    const newOrder = new Order(this.owner, this.books, this.calculateTotalPrice())
    this.owner.registerOrder(newOrder)
    this.clearBooks()
  }

  isEmpty() {
    return this.books.length === 0
  }

  calculateTotalPrice() {
    return this.books.reduce((acc, book) => acc + book.getPrice(), 0)
  }

  clearBooks() {
    this.books.forEach(b => b.removeFromCart())
    this.books = []
  }
}

export default Cart
