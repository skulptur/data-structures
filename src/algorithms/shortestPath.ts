import { Graph, NodeKey } from '../graph'

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

export function shortestPath(source: NodeKey, destination: NodeKey, graph: Graph) {
  const error = !graph.getNode(source)
    ? 'Source node is not in the graph.'
    : !graph.getNode(destination)
    ? 'Destination node is not in the graph.'
    : null

  if (error) {
    throw new Error(error)
  }

  // Upper bounds for shortest path weights from source.
  const d: any = initializeSingleSource(source, graph)

  // Predecessors.
  const predecessors: any = {}

  // Poor man's priority queue, keyed on d.
  let queue: any = initializePriorityQueue(graph)

  // Returns true if q is empty.
  function priorityQueueEmpty() {
    return Object.keys(queue).length === 0
  }

  // Linear search to extract (find and remove) min from q.
  function extractMin(): NodeKey | null {
    let min = Infinity
    let minNode
    Object.keys(queue).forEach((node) => {
      if (d[node] < min) {
        min = d[node]
        minNode = node
      }
    })

    // tslint:disable-next-line
    if (minNode === undefined) {
      // If we reach here, there's a disconnected subgraph, and we're done.
      queue = {}

      return null
    }
    delete queue[minNode]

    return minNode
  }

  function relax(u: NodeKey, v: NodeKey) {
    // var w = getEdgeWeight(u, v)
    const w = 1
    if (d[v] > d[u] + w) {
      d[v] = d[u] + w
      predecessors[v] = u
    }
  }

  function dijkstra() {
    while (!priorityQueueEmpty()) {
      const u = extractMin()

      if (u === null) return

      const node = graph.getNode(u)

      node &&
        node.children.forEach((v) => {
          relax(node.key, v.key)
        })
    }
  }

  // TODO: move this out of this function
  // Assembles the shortest path by traversing the
  // predecessor subgraph from destination to source.
  function path() {
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
      throw new Error('No path found')
    }
    nodeList.push(node)
    nodeList.reverse()

    return {
      weight,
      path: nodeList,
    }
  }

  dijkstra()

  return path()
}
