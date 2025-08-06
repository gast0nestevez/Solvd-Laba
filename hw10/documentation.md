# CustomHashTable - JavaScript Hash Table with Chaining and Auto-Resizing

This is a custom implementation of a **hash table** in JavaScript using **separate chaining** for collision resolution and **automatic resizing** when the load factor exceeds a threshold.

---

## 🔧 Features

- Custom hash function (based on bitwise operations and ASCII codes)
- Collision handling using chaining (buckets with arrays)
- Automatic resizing when the table becomes too full
- Supports `insert`, `get`, `delete`, and `getAllKeys` operations

---

## 📚 Class Overview

### `constructor(size)`

Initializes the hash table with the given `size`. Each position in the table is a separate array (bucket) for chaining.

---

### `hash(key)`

Custom hash function:

* Uses bit shifts and XORs to mix character codes
* Returns an index in the range `[0, tableSize - 1]`

> 📝 You can tweak this function for better distribution if needed.

---

### `insert(key, value)`

* Computes the index via the hash function.
* If the key already exists, updates its value.
* If it's a new key, adds it to the bucket.
* If the **load factor** exceeds `0.7`, it triggers a resize.

---

### `get(key)`

* Computes the index for the key.
* Searches through the bucket for the matching key.
* Returns the associated value, or `undefined` if not found.

---

### `delete(key)`

* Finds the bucket for the key.
* Removes the key-value pair if it exists.
* Decrements the total count.

---

### `getAllKeys()`

Returns a flat list of all keys in the hash table.

---

### `_loadFactor()`

Returns the current load factor:

---

### `_resize()`

When the load factor exceeds `70%`, the table resizes:

* Table size is doubled and increased to the next prime number
* All existing key-value pairs are reinserted (rehashed)

---

### `_nextPrime(n)`

Helper method to find the next prime number ≥ `n`.

---

## 📌 Notes

* The custom **hash function** can be tweaked for better distribution.
* **Resizing** is key to keeping performance close to O(1) on average.
