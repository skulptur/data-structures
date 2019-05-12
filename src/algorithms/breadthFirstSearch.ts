import { Graph, GraphNode } from '../structures/graph'
import { NodeKey } from '../interfaces'
import { createQueue } from '../structures/queue'

export function breadthFirstSearch(
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
}
