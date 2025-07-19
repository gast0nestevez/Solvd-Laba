## Documentation for the Bookstore System

### Description

This system models a simple online bookstore with functionality for users to add books to a cart, remove them, and place orders.

---

### Class: `Book`

* **Attributes**:

  * `title`, `author`, `ISBN`, `price`: Basic book info.
  * `availability`: Whether the book can be added to a cart.
  * `cart`: Reference to the cart the book is currently in.
  * `id`: Unique identifier.
* **Methods**:

  * `getId()`: Returns the book ID.
  * `isAvailable()`: Checks availability.
  * `addToCart(cart)`: Marks as unavailable and assigns to a cart.
  * `removeFromCart()`: Marks as available and removes from cart.
  * `getPrice()`: Returns the book price.
  * `getGenre()`: Abstract method to be implemented by subclasses.

### Subclasses: `FictionBook`, `NonFictionBook`

* Implement `getGenre()` returning "Fiction" or "Non-Fiction" respectively.

---

### Class: `Cart`

* **Attributes**:

  * `owner`: The user who owns this cart.
  * `books`: Array of books currently in the cart.
* **Methods**:

  * `addBook(book)`: Adds a book if available.
  * `removeBook(book)`: Removes the book from the cart.
  * `placeOrder()`: Creates an `Order` and clears the cart.
  * `isEmpty()`: Returns `true` if the cart is empty.
  * `calculateTotalPrice()`: Returns the sum of book prices.
  * `clearBooks()`: Empties the cart and resets book availability.

---

### Class: `User`

* **Attributes**:

  * `name`, `email`: User information.
  * `id`: Unique identifier.
  * `orders`: List of orders the user has placed.
  * `cart`: User's cart.
* **Methods**:

  * `addToCart(book)`: Adds a book via the cart.
  * `removeFromCart(book)`: Removes a book from the cart.
  * `placeOrder()`: Places an order through the cart.
  * `registerOrder(order)`: Adds an order to the user's history.

---

### Class: `Order`

* **Attributes**:

  * `user`: The user who placed the order.
  * `books`: List of books in the order.
  * `totalPrice`: Cost of the order.
  * `id`: Unique identifier.

---

### Object Interaction

* `User` owns a `Cart`, can add/remove books, and place `Orders`.
* `Cart` holds multiple `Books` and calculates prices.
* `Book` ensures it can’t be in more than one cart.
* `Order` is created when the cart is placed, and it records the books and price.

---

### Encapsulation Principles

* Internal state is private by convention.
* Only class methods modify key properties.
* Unique IDs help track objects without conflict.
* Book availability prevents shared state issues between carts.
