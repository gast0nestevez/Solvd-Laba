import Cart from './cart.js'

class User {
  static nextId = 0

  constructor(name, email) {
    this.name = name
    this.email = email
    this.orders = []
    this.cart = new Cart(this)
    
    this.id = User.nextId
    User.nextId++
  }

  addToCart(book) {
    this.cart.addBook(book)
  }

  removeFromCart(book) {
    this.cart.removeBook(book)
  }

  placeOrder() {
    this.cart.placeOrder()
  }

  registerOrder(order) {
    this.orders.push(order)
  }
}

export default User
