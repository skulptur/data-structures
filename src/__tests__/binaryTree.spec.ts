import {
  createBinaryNode,
  createBinaryTree,
  postOrderTraversal,
  preOrderTraversal,
} from '../structures/binaryTree'

describe('BinaryNode', () => {
  let node: any
  beforeEach(() => {
    node = createBinaryNode('a')
  })

  test('existence', () => {
    expect(node).toBeDefined()
  })

  test('key', () => {
    expect(node.key).toEqual('a')
  })

  test('left', () => {
    expect(node.left).toBeNull()
  })

  test('right', () => {
    expect(node.right).toBeNull()
  })

  test('addLeft', () => {
    node.addLeft('b')

    expect(node.left).toBeDefined()
    expect(node.left.key).toEqual('b')
  })

  test('addRight', () => {
    node.addRight('c')

    expect(node.right).toBeDefined()
    expect(node.right.key).toEqual('c')
  })
})

describe('BinaryTree', () => {
  let binaryTree: any
  beforeEach(() => {
    binaryTree = createBinaryTree('a')
  })

  test('existence', () => {
    expect(binaryTree).toBeDefined()
  })

  test('root', () => {
    expect(binaryTree.root).toBeDefined()
    expect(binaryTree.root.key).toEqual('a')
  })

  describe('print', () => {
    test('in order traversal', () => {
      const b = binaryTree.root.addLeft('b')
      const c = binaryTree.root.addRight('c')
      b.addLeft('d')
      b.addRight('e')
      const f = c.addLeft('f')
      c.addRight('g')
      f.addLeft('h')

      expect(binaryTree.print()).toEqual(`d => b => e => a => h => f => c => g`)
    })

    test('pre order traversal', () => {
      const b = binaryTree.root.addLeft('b')
      const c = binaryTree.root.addRight('c')
      b.addLeft('d')
      b.addRight('e')
      const f = c.addLeft('f')
      c.addRight('g')
      f.addLeft('h')

      expect(binaryTree.print(preOrderTraversal)).toEqual(`a => b => d => e => c => f => h => g`)
    })

    test('post order traversal', () => {
      const b = binaryTree.root.addLeft('b')
      const c = binaryTree.root.addRight('c')
      b.addLeft('d')
      b.addRight('e')
      const f = c.addLeft('f')
      c.addRight('g')
      f.addLeft('h')

      expect(binaryTree.print(postOrderTraversal)).toEqual(`d => e => b => h => f => g => c => a`)
    })
  })
})
