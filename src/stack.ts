export interface Stack<T> {
  push(x: any): void
  pop(): T | undefined
  peek(): T | undefined
  readonly length: number
}

export function createStack<T>(): Stack<T> {
  const stack: T[] = []

  return {
    push(x) {
      stack.push(x)
    },
    pop() {
      return stack.length ? stack.pop() : undefined
    },
    peek() {
      return stack.length ? stack[stack.length - 1] : undefined
    },
    get length() {
      return stack.length
    },
  }
}
