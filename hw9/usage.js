import { Stack, MinMaxStack, Queue, BinaryTree, Graph, LinkedList } from './dataStructures.js'

// Usage
const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)

stack.pop()
console.log(stack)
console.log(stack.peek())

const mmStack = new MinMaxStack()
mmStack.push(1)
mmStack.push(2)
mmStack.push(3)
console.log(mmStack.getMin(), mmStack.getMax())

console.log('----------------------------')

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

queue.dequeue()
console.log(queue)
console.log(queue.peek())
console.log(queue) // peek doesn't modify queue

console.log('----------------------------')

const bt = new BinaryTree()
bt.insert(2)
bt.insert(5)
bt.insert(1)
bt.insert(4)
bt.insert(6)

console.log(bt.search(2))
console.log(bt.search(1))
console.log(bt.search(6))
console.log(bt.search(7)) // null

console.log(bt.isBST() ? 'Is BST' : 'Is not BST')

const bst = new BinaryTree()
bst.insert(3)
bst.insert(2)
bst.insert(5)
bst.insert(1)
console.log(bst.isBST() ? 'Is BST' : 'Is not BST')

bt.traverseInOrder()
bt.traversePreOrder()
bt.traversePostOrder()

console.log('----------------------------')

const list = new LinkedList()
list.insert(1)
list.insert(2)
list.insert(3)
list.delete(2)

console.log(list.search(1))
console.log(list.search(2)) // null
console.log(list.search(3))

const listWithCycle = new LinkedList()
listWithCycle.insert(1)
listWithCycle.insert(2)
listWithCycle.insert(3)
listWithCycle.head.next.next.next = listWithCycle.head

console.log(listWithCycle.detectCycle() ? 'Cycle detected' : 'No cycle')

console.log('----------------------------')

const graph = new Graph()
graph.addEdge('A', 'B', 4)
graph.addEdge('A', 'C', 2)
graph.addEdge('B', 'C', 5)
graph.addEdge('B', 'D', 10)
graph.addEdge('C', 'E', 3)
graph.addEdge('E', 'D', 4)
graph.addEdge('D', 'F', 11)

console.log('DFS:')
graph.DFS('A')

console.log('BFS:')
graph.BFS('A')

console.log('BFS shortest path from A to F:', graph.shortestPathBFS('A', 'F'))
console.log('Dijkstra shortest path from A to F:', graph.dijkstra('A', 'F'))
