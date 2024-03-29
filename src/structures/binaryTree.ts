import { NodeKey } from '../interfaces'

export interface TreeNode {
  readonly key: NodeKey
  left: TreeNode | null
  right: TreeNode | null
  addLeft: (key: NodeKey) => void
  addRight: (key: NodeKey) => void
}

export function createBinaryNode(key: NodeKey): TreeNode {
  return {
    key,
    left: null,
    right: null,
    addLeft(leftKey) {
      const newLeft = createBinaryNode(leftKey)
      this.left = newLeft

      return newLeft
    },
    addRight(rightKey) {
      const newRight = createBinaryNode(rightKey)
      this.right = newRight

      return newRight
    },
  }
}

export function inOrderTraversal(node: TreeNode | null, visitFn: (node: TreeNode) => void): void {
  if (node !== null) {
    inOrderTraversal(node.left, visitFn)
    visitFn(node)
    inOrderTraversal(node.right, visitFn)
  }
}

export function preOrderTraversal(node: TreeNode | null, visitFn: (node: TreeNode) => void): void {
  if (node !== null) {
    visitFn(node)
    preOrderTraversal(node.left, visitFn)
    preOrderTraversal(node.right, visitFn)
  }
}

export function postOrderTraversal(node: TreeNode | null, visitFn: (node: TreeNode) => void): void {
  if (node !== null) {
    postOrderTraversal(node.left, visitFn)
    postOrderTraversal(node.right, visitFn)
    visitFn(node)
  }
}

export function createBinaryTree(rootKey: NodeKey) {
  const root = createBinaryNode(rootKey)

  return {
    root,
    print(
      traversalFn: (
        node: TreeNode | null,
        visitFn: (node: TreeNode) => void
      ) => void = inOrderTraversal
    ) {
      let result = ''

      const visit = (node: TreeNode) => {
        result += result.length === 0 ? node.key : ` => ${node.key}`
      }

      traversalFn(this.root, visit)

      return result
    },
  }
}
