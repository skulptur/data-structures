import { createTree, createNode, TreeNode } from '../tree'

describe('Node', () => {
  let node: TreeNode
  beforeEach(() => {
    node = createNode('a')
  })

  test('existence', () => {
    expect(node).toBeDefined()
  })

  test('key', () => {
    expect(node.key).toEqual('a')
  })

  test('children', () => {
    expect(node.children).toBeDefined()
    expect(node.children.length).toEqual(0)
  })

  test('addChild', () => {
    node.addChild('b')

    expect(node.children.length).toEqual(1)
    expect(node.children.map((n) => n.key).includes('b')).toBe(true)
  })
})

describe('Tree', () => {
  let tree: any
  beforeEach(() => {
    tree = createTree('a')
  })

  test('existence', () => {
    expect(tree).toBeDefined()
  })

  test('root', () => {
    expect(tree.root).toBeDefined()
    expect(tree.root.key).toEqual('a')
  })

  test('print', () => {
    const b = tree.root.addChild('b')
    const c = tree.root.addChild('c')
    b.addChild('d')
    b.addChild('e')
    const f = c.addChild('f')
    c.addChild('g')
    f.addChild('h')

    expect(tree.print()).toEqual(
      `
a
  b
    d
    e
  c
    f
      h
    g
`.trim()
    )
  })
})
