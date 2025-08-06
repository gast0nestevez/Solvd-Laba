## 🔍 Analysis

### Hash Function Performance

The custom hash function is loosely inspired by DJB2, using bitwise operations:

```js
hash <<= i << 3
hash ^= (key.charCodeAt(i) << 5)
```

* This approach attempts to distribute keys uniformly using left shifts and XORs.
* It performs well for small datasets, but lacks the rigorous distribution quality of production-grade hash functions.
* **Time complexity:** `O(k)`, where `k` is the length of the key.

---

### Hash Table Operations

Assuming a good hash distribution:

| Operation | Average Time | Worst-Case Time |
| --------- | ------------ | --------------- |
| `insert`  | O(1)         | O(n)            |
| `get`     | O(1)         | O(n)            |
| `delete`  | O(1)         | O(n)            |

* All operations are **amortized O(1)** due to separate chaining and resizing.
* In the **worst case**, all keys hash to the same bucket, resulting in **O(n)** operations.

---

### Load Factor & Resizing

* A **load factor threshold of 0.7** triggers resizing to maintain efficiency.
* The table resizes to the **next prime number** after doubling the size to reduce clustering and maintain uniform distribution.
* Resizing has a cost of **O(n)**, but it happens infrequently.

---

### Trade-offs

* ✅ **Separate chaining** simplifies collision handling compared to open addressing.
* ✅ **Dynamic resizing** ensures consistent average-case performance.
* ⚠️ The **hash function** is efficient but not robust enough for large-scale or security-critical systems.
* ⚠️ **Resizing** is costly but essential for long-term performance.

---

### Summary

This hash table implementation provides efficient average-case performance for insertions, lookups, and deletions. While it trades off some hash quality for simplicity and speed, it serves well for learning purposes and small applications.

---