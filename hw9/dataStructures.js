class Stack {
  constructor() {
    this.elements = []
  }

  push(element) {
    this.elements.push(element)
  }

  pop() {
    if (this.isEmpty()) throw new Error('Stack is empty. Cannot pop.')
    return this.elements.pop()
  }

  peek() {
    if (this.isEmpty()) throw new Error('Stack is empty. Cannot peek.')
    return this.elements[this.elements.length - 1]
  }

  isEmpty() {
    return this.elements.length === 0
  }
}

class MinMaxStack extends Stack {
  constructor() {
    super()
    this.minStack = []
    this.maxStack = []
  }

  push(value) {
    this.elements.push(value)

    // Update min stack
    if (
      this.minStack.length === 0 ||
      value <= this.getMin()
    ) {
      this.minStack.push(value)
    } else {
      this.minStack.push(this.getMin())
    }

    // Update max stack
    if (
      this.maxStack.length === 0 ||
      value >= this.getMax()
    ) {
      this.maxStack.push(value)
    } else {
      this.maxStack.push(this.getMax())
    }
  }

  getMin() {
    if (this.minStack.length === 0) throw new Error('Empty stack, no minimum.')
    return this.minStack[this.minStack.length - 1]
  }

  getMax() {
    if (this.maxStack.length === 0) throw new Error('Empty stack, no maximum.')
    return this.maxStack[this.maxStack.length - 1]
  }
}

class Queue {
  constructor() {
    this.elements = []
  }

  enqueue(element) {
    this.elements.push(element)
  }

  dequeue() {
    if (this.isEmpty()) throw new Error('Queue is empty. Cannot dequeue.')    
    return this.elements.shift()
  }

  peek() {
    if (this.isEmpty()) throw new Error('Queue is empty. Cannot peek.')    
    return this.elements[0]
  }

  isEmpty() {
    return this.elements.length === 0
  }
}

class TreeNode {
  constructor(value=null) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  // Insert the node in the first free position, following level-order traversal.
  insert(value) {
    if (this.root === null) {
      this.root = new TreeNode(value)
      return
    }

    const queue = [this.root]

    while (queue.length > 0) {
      const node = queue.shift()

      if (node.left === null) {
        node.left = new TreeNode(value)
        return
      } else {
        queue.push(node.left)
      }

      if (node.right === null) {
        node.right = new TreeNode(value)
        return
      } else {
        queue.push(node.right)
      }
    }
  }
  
  // There is no guaranteed order in BT, so we need to check all the nodes
  search(value) {
    const dfs = (node) => {
      if (node === null) return null
      if (node.value === value) return node

      const leftResult = dfs(node.left)
      if (leftResult !== null) return leftResult

      return dfs(node.right)
    }

    return dfs(this.root)
  }

  // Left, root, right
  traverseInOrder(node=this.root) {
    if (node !== null) {
      this.traverseInOrder(node.left)
      console.log(node.value)
      this.traverseInOrder(node.right)
    }
  }

  // Root, left, right
  traversePreOrder(node=this.root) {
    if (node !== null) {
      console.log(node.value)
      this.traversePreOrder(node.left)
      this.traversePreOrder(node.right)
    }
  }

  // Left, right, root
  traversePostOrder(node=this.root) {
    if (node !== null) {
      this.traversePostOrder(node.left)
      this.traversePostOrder(node.right)
      console.log(node.value)
    }
  }

  isBST() {
    const isBSTNode = (node, min=null, max=null) => {
      if (node === null) return true

      if ((min && node.value <= min) || (max && node.value >= max)) {
        return false
      }

      return isBSTNode(node.left, min, node.value) &&
             isBSTNode(node.right, node.value, max)
    }

    return isBSTNode(this.root)
  }
}

class Graph {
  constructor() {
    this.adjList = new Map()
  }

  addVertex(vertex) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, [])
    }
  }

  addEdge(v1, v2, weight=1) {
    this.addVertex(v1)
    this.addVertex(v2)

    this.adjList.get(v1).push({ node: v2, weight })
    // Undirected graph
    this.adjList.get(v2).push({ node: v1, weight })
  }

  DFS(start) {
    const visited = new Set()

    const DFSFromNode = (vertex) => {
      if (!vertex || visited.has(vertex)) return
      console.log(vertex)
      visited.add(vertex)

      for (const neighborObj of this.adjList.get(vertex)) {
        DFSFromNode(neighborObj.node )
      }
    }

    DFSFromNode(start)
  }

  BFS(start) {
    const visited = new Set()
    const queue = [start]

    while (queue.length > 0) {
      const vertex = queue.shift()

      if (!visited.has(vertex)) {
        console.log(vertex)
        visited.add(vertex)

        for (const neighborObj of this.adjList.get(vertex)) {
          if (!visited.has(neighborObj.node)) {
            queue.push(neighborObj.node)
          }
        }
      }
    }
  }

  shortestPathBFS(start, end) {
    if (start === end) return [start]

    const visited = new Set()
    const queue = [start]
    const predecessor = new Map()

    visited.add(start)

    while (queue.length > 0) {
      const vertex = queue.shift()

      for (const neighborObj of this.adjList.get(vertex)) {
        const neighbor = neighborObj.node
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          predecessor.set(neighbor, vertex)
          queue.push(neighbor)

          if (neighbor === end) {
            const path = []
            let current = end
            while (current !== undefined) {
              path.unshift(current)
              current = predecessor.get(current)
            }
            return path
          }
        }
      }
    }

    return null
  }

  dijkstra(start, end) {
    const distances = new Map()
    const previous = new Map()
    const queue = []

    for (const vertex of this.adjList.keys()) {
      distances.set(vertex, Infinity)
      previous.set(vertex, null)
    }

    distances.set(start, 0)
    queue.push({ node: start, dist: 0 })

    while (queue.length > 0) {
      // Sort queue by distance, then get the closest node
      queue.sort((a, b) => a.dist - b.dist)
      const { node: current } = queue.shift()

      if (current === end) {
        const path = []
        let node = end
        while (node) {
          path.unshift(node)
          node = previous.get(node)
        }
        return path
      }

      for (const neighborObj of this.adjList.get(current)) {
        const neighbor = neighborObj.node
        const weight = neighborObj.weight

        const alt = distances.get(current) + weight
        if (alt < distances.get(neighbor)) {
          distances.set(neighbor, alt)
          previous.set(neighbor, current)
          queue.push({ node: neighbor, dist: alt })
        }
      }
    }
    
    return null
  }
}

class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }

  insert(value) {
    // Empty linked list case
    if (this.head === null) {
      this.head = new ListNode(value)
      return
    }

    // Traverse to the end
    let current = this.head
    while (current.next !== null) {
      current = current.next
    }

    // Add new node at the end
    current.next = new ListNode(value)
  }

  delete(value) {
    // Empty linked list case
    if (this.head === null) return

    // Root is the node to delete
    if (this.head.value === value) {
      this.head = this.head.next
      return
    }

    // Traverse to find the node
    let current = this.head
    let prev = null
    while (current !== null) {
      if (current.value === value) {
        prev.next = current.next
        return
      }

      prev = current
      current = current.next
    }
  }

  search(value) {
    let current = this.head
    while (current !== null) {
      if (current.value === value) return current
      
      current = current.next
    }
    return null
  }

  // Floyd's Cycle Detection Algorithm
  detectCycle() {
    let slow = this.head
    let fast = this.head

    while (fast !== null && fast.next !== null) {
      slow = slow.next
      fast = fast.next.next

      if (fast === slow) return true
    }

    return false
  }
}

export { Stack, MinMaxStack, Queue, BinaryTree, Graph, LinkedList }
