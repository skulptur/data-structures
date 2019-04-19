import { shortestPath } from '../algorithms/shortestPath'
import { createGraph } from '../graph'

describe("Dijkstra's Shortest Path Algorithm", () => {
  it('Should compute shortest path on a single edge.', () => {
    const graph = createGraph()
    const nodes = ['a', 'b']

    nodes.forEach(graph.addNode)
    graph.addEdge('a', 'b')

    expect(shortestPath('a', 'b', graph)).toEqual({ path: nodes, weight: 1 })
  })

  it('Should compute shortest path on two edges.', () => {
    const graph = createGraph()
    const nodes = ['a', 'b', 'c']

    nodes.forEach(graph.addNode)
    graph.addEdge('a', 'b')
    graph.addEdge('b', 'c')

    expect(shortestPath('a', 'c', graph)).toEqual({ path: nodes, weight: 2 })
  })

  it('Throws error if source node is not in graph.', () => {
    const graph = createGraph()
    expect(() => shortestPath('a', 'c', graph)).toThrow()
  })

  it('Throws error if destination node is not in graph.', () => {
    const graph = createGraph()
    graph.addNode('a')
    graph.addNode('b')
    graph.addEdge('a', 'b')
    expect(() => shortestPath('a', 'c', graph)).toThrow()
  })

  it('Throws error if no path exists.', () => {
    const graph = createGraph()
    const nodes = ['a', 'b', 'c', 'd']
    nodes.forEach(graph.addNode)
    ;[['a', 'b'], ['d', 'e']].forEach((edge) => graph.addEdge(edge[0], edge[1]))

    expect(() => shortestPath('a', 'e', graph)).toThrow()
  })

  it('Works with disconnected subgraphs.', () => {
    const graph = createGraph()
    const nodes = ['a', 'b', 'c', 'd', 'e']
    nodes.forEach(graph.addNode)
    ;[['a', 'b'], ['b', 'c'], ['d', 'e']].forEach((edge) => graph.addEdge(edge[0], edge[1]))

    expect(shortestPath('a', 'c', graph)).toEqual({ path: ['a', 'b', 'c'], weight: 2 })
  })
})
