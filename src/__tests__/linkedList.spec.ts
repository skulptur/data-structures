import { createLinkedList, createNode, LinkedList, LinkedListNode } from '../structures/linkedList'

describe('Node', () => {
  let node: LinkedListNode<string>
  beforeEach(() => {
    node = createNode('a')
  })

  test('instantiation', () => {
    expect(node).toBeDefined()
    expect(node.value).toEqual('a')
  })
})

describe('Linked List', () => {
  let linkedList: LinkedList<any>
  beforeEach(() => {
    linkedList = createLinkedList()
  })

  test('existence', () => {
    expect(linkedList).toBeDefined()
  })

  test('length', () => {
    expect(linkedList.length).toEqual(0)
  })

  test('head', () => {
    expect(linkedList.head).toBeNull()

    const a = linkedList.push('a')
    expect(linkedList.head).toEqual(a)
  })

  test('tail', () => {
    expect(linkedList.tail).toBeNull()

    const a = linkedList.push('a')
    expect(linkedList.tail).toEqual(a)
  })

  test('push', () => {
    linkedList.push('a')
    expect(linkedList.head && linkedList.head.value).toEqual('a')
    expect(linkedList.tail && linkedList.tail.value).toEqual('a')
    expect(linkedList.length).toEqual(1)

    const b = linkedList.push('b')

    expect(linkedList.head && linkedList.head.next).toEqual(b)
    expect(linkedList.tail).toEqual(b)
    expect(linkedList.length).toEqual(2)
  })

  test('pop', () => {
    // empty list
    expect(linkedList.pop()).toEqual(null)
    expect(linkedList.length).toEqual(0)

    // List of length 1
    linkedList.push(1)
    expect(linkedList.length).toEqual(1)
    const node = linkedList.pop()
    expect(node && node.value).toEqual(1)
    expect(linkedList.head).toEqual(null)
    expect(linkedList.tail).toEqual(null)
    expect(linkedList.length).toEqual(0)

    // List of length < 1
    const values = ['a', 'b', 'c', 'd', 'e']
    values.map((val) => linkedList.push(val))
    const popped = linkedList.pop()
    expect(popped && popped.value).toEqual('e')
    expect(linkedList.tail && linkedList.tail.value).toEqual('d')
    expect(linkedList.length).toEqual(4)
  })

  test('get', () => {
    const values = ['a', 'b', 'c', 'd', 'e']
    const nodes = values.map((val) => linkedList.push(val))

    const badIndex = linkedList.get(7)
    expect(badIndex).toBeNull()

    const head = linkedList.get(0)
    expect(head).toEqual(nodes[0])

    const atIndexThree = linkedList.get(3)
    expect(atIndexThree).toEqual(nodes[3])
  })

  describe('delete', () => {
    const values = ['a', 'b', 'c', 'd', 'e']
    let nodes: any[]

    beforeEach(() => {
      linkedList = createLinkedList()
      nodes = values.map((val) => linkedList.push(val))
    })

    test('bad index', () => {
      // the length of the list is the first index outside of
      // the acceptable range of values
      const index = values.length
      const badIndex = linkedList.delete(index)
      expect(badIndex).toBeNull()
    })

    test('head', () => {
      const head = linkedList.delete(0)
      expect(head).toEqual(nodes[0])
    })

    test('middlish index', () => {
      const index = 2
      const c = linkedList.delete(index)

      expect(c).toEqual(nodes[index])
      expect(linkedList.length).toEqual(values.length - 1)
    })

    test('tail', () => {
      const tail = linkedList.delete(values.length - 1)
      expect(tail).toEqual(nodes[nodes.length - 1])
      expect(linkedList.tail).not.toEqual(tail)
      expect(linkedList.tail).toEqual(nodes[nodes.length - 2])
      expect(linkedList.tail && linkedList.tail.next).toBeNull()
    })
  })

  test('isEmpty', () => {
    expect(linkedList.isEmpty()).toBe(true)
    linkedList.push('a')
    expect(linkedList.isEmpty()).toBe(false)
  })

  test('print', () => {
    const values = ['a', 'b', 'c', 'd', 'e']
    values.forEach((val) => {
      linkedList.push(val)
    })

    expect(linkedList.print()).toEqual('a => b => c => d => e')
  })
})
