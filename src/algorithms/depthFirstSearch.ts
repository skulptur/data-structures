import { Graph, GraphNode } from '../structures/graph'
import { NodeKey } from '../interfaces'

export function depthFirstSearch(
  startingNodeKey: NodeKey,
  visitFn: (node: GraphNode) => void,
  graph: Graph
) {
  const startingNode = graph.getNode(startingNodeKey)

  if (!startingNode) return

  const visitedHash = graph.nodes.reduce((acc: any, cur) => {
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
}
