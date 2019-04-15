import { createQueue } from './queue'

export interface GraphNode {
  key: string
  children: GraphNode[]
  addChild: (node: GraphNode) => void
}

export interface Graph {
  directed: boolean
  nodes: GraphNode[]
  edges: string[]
  addNode: (key: string) => void
  getNode: (key: string) => GraphNode | undefined
  addEdge: (node1Key: string, node2Key: string) => boolean
  print: () => void
  bfs: (startingNodeKey: string, visitFn: (node: GraphNode) => void) => void
  dfs: (startingNodeKey: string, visitFn: (node: GraphNode) => void) => void
}

export function createNode(key: string): GraphNode {
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

    bfs(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey)

      if (!startingNode) return

      const visitedHash = nodes.reduce((acc: any, cur) => {
        acc[cur.key] = false
        return acc
      }, {})

      const queue = createQueue<GraphNode>()
      queue.enqueue(startingNode)

      while (queue.length) {
        const currentNode = queue.dequeue()
        if (!currentNode) break

        if (!visitedHash[currentNode.key]) {
          visitFn(currentNode)
          visitedHash[currentNode.key] = true
        }

        currentNode.children.forEach((node) => {
          if (!visitedHash[node.key]) {
            queue.enqueue(node)
          }
        })
      }
    },

    dfs(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey)

      if (!startingNode) return

      const visitedHash = nodes.reduce((acc: any, cur) => {
        acc[cur.key] = false
        return acc
      }, {})

      function explore(node: GraphNode) {
        if (visitedHash[node.key]) return

        visitFn(node)
        visitedHash[node.key] = true

        node.children.forEach((child) => {
          explore(child)
        })
      }

      explore(startingNode)
    },
  }
}

// const graph = createGraph(true)

// graph.addNode('Kyle')
// graph.addNode('Anna')
// graph.addNode('Krios')
// graph.addNode('Tali')

// graph.addEdge('Kyle', 'Anna')
// graph.addEdge('Anna', 'Kyle')
// graph.addEdge('Kyle', 'Krios')
// graph.addEdge('Kyle', 'Tali')
// graph.addEdge('Anna', 'Krios')
// graph.addEdge('Anna', 'Tali')
// graph.addEdge('Krios', 'Anna')
// graph.addEdge('Tali', 'Kyle')

// console.log(graph.print())

// exports.createNode = createNode
// exports.createGraph = createGraph
