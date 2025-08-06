
# 📘 Data Structures & Algorithms Documentation

This module implements common data structures in JavaScript, including:

- Stack and MinMaxStack
- Queue
- Binary Tree
- Graph
- Linked List

---

## 📦 `class Stack`

A basic **Last-In-First-Out (LIFO)** stack.

### Methods

- `push(element)`  
  Adds an element to the top of the stack.  
  **Time Complexity:** O(1)

- `pop()`  
  Removes and returns the top element. Throws an error if the stack is empty.  
  **Time Complexity:** O(1)

- `peek()`  
  Returns the top element without removing it.  
  **Time Complexity:** O(1)

- `isEmpty()`  
  Returns `true` if the stack is empty.  
  **Time Complexity:** O(1)

---

## 📦 `class MinMaxStack extends Stack`

Extends `Stack` to support retrieving the **minimum** and **maximum** values in **O(1) time**.

### Additional Properties

- `minStack`: Keeps track of the current minimum value at each stack level.
- `maxStack`: Keeps track of the current maximum value at each stack level.

### Overridden Methods

- `push(value)`  
  Pushes `value` and updates `minStack` and `maxStack` accordingly.  
  **Time Complexity:** O(1)

- `getMin()`  
  Returns the current minimum.  
  **Time Complexity:** O(1)

- `getMax()`  
  Returns the current maximum.  
  **Time Complexity:** O(1)

---

## 📦 `class Queue`

A **First-In-First-Out (FIFO)** queue.

### Methods

- `enqueue(element)`  
  Adds an element to the end.  
  **Time Complexity:** O(1)

- `dequeue()`  
  Removes and returns the front element. Throws an error if the queue is empty.  
  **Time Complexity:** O(n) due to `.shift()`

- `peek()`  
  Returns the front element without removing it.  
  **Time Complexity:** O(1)

- `isEmpty()`  
  Checks whether the queue is empty.  
  **Time Complexity:** O(1)

---

## 🌲 `class TreeNode`

Represents a node in a binary tree.

- `value`: the stored data
- `left`: reference to the left child
- `right`: reference to the right child

---

## 🌳 `class BinaryTree`

Implements a **binary tree**, including insertion, search, traversals, and BST validation.

### Methods

- `insert(value)`  
  Inserts a node using **level-order traversal** (BFS) to the first free position.  
  **Time Complexity:** O(n)  
  **Note:** Maintains completeness but not BST order.

- `search(value)`  
  Searches recursively through the tree using **DFS**.  
  **Time Complexity:** O(n)

- `traverseInOrder(node)`  
  Left → Root → Right traversal.  
  **Time Complexity:** O(n)

- `traversePreOrder(node)`  
  Root → Left → Right traversal.  
  **Time Complexity:** O(n)

- `traversePostOrder(node)`  
  Left → Right → Root traversal.  
  **Time Complexity:** O(n)

- `isBST()`  
  Validates if the tree satisfies Binary Search Tree properties.  
  Uses recursion with value constraints (min/max).  
  **Time Complexity:** O(n)

---

## 🔗 `class Graph`

Undirected and weighted graph using an **adjacency list** representation.

### Methods

- `addVertex(vertex)`  
  Adds a vertex to the graph if not already present.  
  **Time Complexity:** O(1)

- `addEdge(v1, v2)`  
  Adds an undirected edge between `v1` and `v2`.  
  **Time Complexity:** O(1) per edge

- `DFS(start)`  
  Depth-First Search traversal from the `start` vertex.  
  **Time Complexity:** O(V + E)

- `BFS(start)`  
  Breadth-First Search traversal from the `start` vertex.  
  **Time Complexity:** O(V + E)

- `shortestPathBFS(start, end)`  
  Returns the **shortest path** (minimum number of edges) between `start` and `end` using BFS.  
  Returns `null` if no path exists.  
  **Time Complexity:** O(V + E)

- `dijkstra(start, end)`  
  Returns the **shortest path** from `start` to `end` based on edge weights using **Dijkstra's Algorithm**.
  Returns `null` if no path exists.
  **Time Complexity:** O((V + E) log V) if optimized with a priority queue (O(V²) here due to sort).
---

## 🔗 `class ListNode`

Node structure for a **singly linked list**.

- `value`: stored data
- `next`: pointer to the next node

---

## 🔗 `class LinkedList`

Implements a **singly linked list** with insertion, deletion, search, and cycle detection.

### Methods

- `insert(value)`  
  Inserts a new node at the end of the list.  
  **Time Complexity:** O(n)

- `delete(value)`  
  Deletes the first occurrence of the given value.  
  **Time Complexity:** O(n)

- `search(value)`  
  Returns the first node with the specified value.  
  **Time Complexity:** O(n)

- `detectCycle()`  
  Detects a cycle using **Floyd’s Tortoise and Hare Algorithm**.  
  **Time Complexity:** O(n), **Space Complexity:** O(1)

---

## ✅ Module Exports

```js
export {
  Stack,
  MinMaxStack,
  Queue,
  BinaryTree,
  Graph,
  LinkedList
}
```
