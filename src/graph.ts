export type NodeKey = number | string

export interface GraphNode {
  key: NodeKey
  children: GraphNode[]
  addChild: (node: GraphNode) => void
}

export interface Graph {
  directed: boolean
  nodes: GraphNode[]
  edges: string[]
  addNode: (key: NodeKey) => void
  getNode: (key: NodeKey) => GraphNode | undefined
  addEdge: (node1Key: NodeKey, node2Key: NodeKey) => boolean
  print: () => void
}

export function createNode(key: NodeKey): GraphNode {
  const children: GraphNode[] = []

  return {
    key,
    children,
    addChild(node: GraphNode) {
      children.push(node)
    },
  }
}

export function createGraph(directed = false): Graph {
  const nodes: GraphNode[] = []
  const edges: string[] = []

  return {
    directed,
    nodes,
    edges,

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
