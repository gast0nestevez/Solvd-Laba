class Order {
  static nextId = 0

  constructor(user, books, totalPrice) {
    this.user = user
    this.books = books
    this.totalPrice = totalPrice

    this.id = Order.nextId
    Order.nextId++
  }
}

export default Order