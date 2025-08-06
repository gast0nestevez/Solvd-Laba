import test from 'node:test'
import assert from 'node:assert'
import { CustomHashTable } from './hashTable.js'

test('Items can be added and retrieved', () => {
  const table = new CustomHashTable(5)
  table.insert('a', 100)
  table.insert('b', 200)

  assert.strictEqual(table.get('a'), 100)
  assert.strictEqual(table.get('b'), 200)
})

test('Items can be deleted', () => {
  const table = new CustomHashTable(5)
  table.insert('x', 99)
  table.delete('x')

  assert.strictEqual(table.get('x'), undefined)
})

test('Table grows dynamically based on load factor', () => {
  const table = new CustomHashTable(3)
  const originalSize = table.tableSize

  table.insert('a', 1)
  table.insert('b', 2)
  table.insert('c', 3) // Should trigger resize after this insertion

  assert.ok(table.tableSize > originalSize)
  assert.strictEqual(table.get('a'), 1)
  assert.strictEqual(table.get('b'), 2)
  assert.strictEqual(table.get('c'), 3)
})

test('All keys can be retrieved', () => {
  const table = new CustomHashTable(5)
  table.insert('apple', 10)
  table.insert('banana', 20)
  table.insert('cherry', 30)

  const keys = table.getAllKeys()
  assert.deepStrictEqual(new Set(keys), new Set(['apple', 'banana', 'cherry']))
})

test('Collisions are handled gracefully', () => {
  const table = new CustomHashTable(1) // Force all keys to collide
  table.insert('one', 1)
  table.insert('two', 2)
  table.insert('three', 3)

  assert.strictEqual(table.get('one'), 1)
  assert.strictEqual(table.get('two'), 2)
  assert.strictEqual(table.get('three'), 3)
})

test('Updating an existing key overwrites its value', () => {
  const table = new CustomHashTable(5)
  table.insert('key', 42)
  table.insert('key', 99)

  assert.strictEqual(table.get('key'), 99)
})
