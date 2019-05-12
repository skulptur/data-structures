import { Graph } from '../structures/graph'
import { NodeKey } from '../interfaces'

function initializeSingleSource(source: NodeKey, graph: Graph) {
  const d = graph.nodes.reduce(
    (acc, node) => {
      acc[node.key] = Infinity

      return acc
    },
    {} as any
  )

  d[source] = 0

  return d
}

// Adds entries in q for all nodes.
function initializePriorityQueue(graph: Graph) {
  const queue: any = {}
  graph.nodes.forEach((node) => {
    queue[node.key] = true
  })

  return queue
}

function priorityQueueEmpty(queue: any) {
  return Object.keys(queue).length === 0
}

// Linear search to extract (find and remove) min from q.
function extractMin(queue: any, d: any): NodeKey | null {
  let min = Infinity
  let minNode
  Object.keys(queue).forEach((node) => {
    if (d[node] < min) {
      min = d[node]
      minNode = node
    }
  })

  // Disconnected subgraph,  we're done.
  // tslint:disable-next-line
  if (minNode === undefined) return null

  delete queue[minNode]

  return minNode
}

function dijkstra(source: NodeKey, graph: Graph) {
  // Predecessors.
  const predecessors: any = {}

  // Upper bounds for shortest path weights from source.
  const weightsFromSource: any = initializeSingleSource(source, graph)
  // Poor man's priority queue, keyed on d.
  let queue: any = initializePriorityQueue(graph)

  function relax(u: NodeKey, v: NodeKey) {
    // var w = getEdgeWeight(u, v)
    const w = 1
    if (weightsFromSource[v] > weightsFromSource[u] + w) {
      weightsFromSource[v] = weightsFromSource[u] + w
      predecessors[v] = u
    }
  }

  while (!priorityQueueEmpty(queue)) {
    const u = extractMin(queue, weightsFromSource)

    if (u === null) {
      queue = {}
      break
    }

    const node = graph.getNode(u)

    node &&
      node.children.forEach((v) => {
        relax(node.key, v.key)
      })
  }

  return predecessors
}

interface Path {
  weight: number
  path: NodeKey[]
}

// Assembles the shortest path by traversing the
// predecessor subgraph from destination to source.
function path(source: NodeKey, destination: NodeKey, predecessors: any): Path | null {
  const nodeList = []
  let weight = 0
  let node = destination
  while (predecessors[node]) {
    nodeList.push(node)
    // weight += getEdgeWeight(p[node], node)
    weight += 1
    node = predecessors[node]
  }

  if (node !== source) {
    return null
  }

  nodeList.push(node)
  nodeList.reverse()

  return {
    weight,
    path: nodeList,
  }
}

export function shortestPath(source: NodeKey, destination: NodeKey, graph: Graph) {
  const error = !graph.getNode(source)
    ? 'Source node is not in the graph.'
    : !graph.getNode(destination)
    ? 'Destination node is not in the graph.'
    : null

  if (error) {
    throw new Error(error)
  }

  return path(source, destination, dijkstra(source, graph))
}
