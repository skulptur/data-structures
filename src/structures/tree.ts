import { NodeKey } from '../interfaces'

export interface TreeNode {
  readonly key: NodeKey
  readonly children: TreeNode[]
  addChild: (childKey: NodeKey) => void
}

export function createNode(key: NodeKey): TreeNode {
  const children: TreeNode[] = []

  return {
    key,
    children,
    addChild(childKey) {
      const childNode = createNode(childKey)
      children.push(childNode)

      return childNode
    },
  }
}

export function createTree(rootKey: NodeKey) {
  const root = createNode(rootKey)

  return {
    root,
    traverse(node: TreeNode, visitFn: (node: TreeNode, depth: number) => void, depth: number) {
      visitFn(node, depth)

      if (node.children.length) {
        node.children.forEach((n) => this.traverse(n, visitFn, depth + 1))
      }
    },
    print() {
      let result = ''

      function addKeyToResult(node: TreeNode, depth: number) {
        result += result.length === 0 ? node.key : `\n${' '.repeat(depth * 2)}${node.key}`
      }

      this.traverse(root, addKeyToResult, 0)

      return result
    },
  }
}
