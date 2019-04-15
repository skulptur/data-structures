import { createQueue } from './queue'

export interface PriorityQueue<T> {
  enqueue(item: T, isHighPriority?: boolean): void
  dequeue(): {} | undefined
  peek(): {} | undefined
  readonly length: number
}

export function createPriorityQueue<T>(): PriorityQueue<T> {
  const highPriorityQueue = createQueue<T>()
  const lowPriorityQueue = createQueue<T>()

  return {
    enqueue(item, isHighPriority = false) {
      const queue = isHighPriority ? highPriorityQueue : lowPriorityQueue
      queue.enqueue(item)
    },
    dequeue() {
      return highPriorityQueue.length ? highPriorityQueue.dequeue() : lowPriorityQueue.dequeue()
    },
    peek() {
      return highPriorityQueue.length ? highPriorityQueue.peek() : lowPriorityQueue.peek()
    },
    get length() {
      return highPriorityQueue.length + lowPriorityQueue.length
    },
  }
}
