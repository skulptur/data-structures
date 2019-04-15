export interface Queue<T> {
  enqueue(x: T): void
  dequeue(): T | undefined
  peek(): T | undefined
  readonly length: number
}

export function createQueue<T>(): Queue<T> {
  const queue: T[] = []

  return {
    enqueue(x) {
      queue.unshift(x)
    },
    dequeue() {
      return queue.length ? queue.pop() : undefined
    },
    peek() {
      return queue.length ? queue[queue.length - 1] : undefined
    },
    get length() {
      return queue.length
    },
  }
}
