import { NodeKey } from '../interfaces'

export interface GraphNode {
  readonly key: NodeKey
  readonly children: GraphNode[]
  addChild: (node: GraphNode) => void
}

export interface Graph {
  readonly isDirected: boolean
  readonly nodes: GraphNode[]
  readonly edges: string[]
  addNode: (key: NodeKey) => void
  getNode: (key: NodeKey) => GraphNode | undefined
  addEdge: (node1Key: NodeKey, node2Key: NodeKey) => boolean
  print: () => void
}

export function createNode(key: NodeKey): GraphNode {
  const children: GraphNode[] = []

  return {
    get key() {
      return key
    },
    get children() {
      return children
    },
    addChild(node: GraphNode) {
      children.push(node)
    },
  }
}

export function createGraph(directed = false): Graph {
  const nodes: GraphNode[] = []
  const edges: string[] = []

  return {
    get isDirected() {
      return directed
    },

    get edges() {
      return edges
    },

    get nodes() {
      return nodes
    },

    addNode(key) {
      nodes.push(createNode(key))
    },

    getNode(key) {
      return nodes.find((n) => n.key === key)
    },

    addEdge(node1Key, node2Key) {
      const node1 = this.getNode(node1Key)
      const node2 = this.getNode(node2Key)

      if (!node1 || !node2) return false

      node1.addChild(node2)

      if (!directed) {
        node2.addChild(node1)
      }

      edges.push(`${node1Key}${node2Key}`)

      return true
    },

    print() {
      return nodes
        .map(({ children, key }) => {
          let result = `${key}`

          if (children.length) {
            result += ` => ${children.map((node) => node.key).join(' ')}`
          }

          return result
        })
        .join('\n')
    },
  }
}
