import { createPriorityQueue, PriorityQueue } from '../priorityQueue'

describe('Priority Queue', () => {
  let queue: PriorityQueue<string>
  beforeEach(() => {
    queue = createPriorityQueue()
  })

  test('existence', () => {
    expect(queue).toBeDefined()
  })

  test('enqueue', () => {
    queue.enqueue('foo')
    expect(queue.length).toEqual(1)
    expect(queue.peek()).toEqual('foo')

    queue.enqueue('bar', true)
    expect(queue.length).toEqual(2)
    expect(queue.peek()).toEqual('bar')
  })

  test('dequeue', () => {
    queue.enqueue('foo')
    queue.enqueue('bar', true)

    const first = queue.dequeue()
    expect(first).toEqual('bar')

    const second = queue.dequeue()
    expect(second).toEqual('foo')
  })

  test('peek', () => {
    queue.enqueue('foo')
    queue.enqueue('bar', true)

    expect(queue.peek()).toEqual('bar')
  })

  test('length', () => {
    expect(queue.length).toEqual(0)

    queue.enqueue('foo')
    expect(queue.length).toEqual(1)

    queue.enqueue('bar', true)
    expect(queue.length).toEqual(2)
  })
})
