export interface LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null
}

export interface LinkedList<T> {
  head: LinkedListNode<T> | null
  tail: LinkedListNode<T> | null
  length: number
  push(value: T): LinkedListNode<T>
  pop(): LinkedListNode<T> | null
  get(index: number): LinkedListNode<T> | null
  delete(index: number): LinkedListNode<T> | null
  isEmpty(): boolean
  print(): string
}

export function createNode<T>(value: T) {
  return {
    value,
    next: null,
  }
}

export function createLinkedList<T>(): LinkedList<T> {
  return {
    head: null,
    tail: null,
    length: 0,

    push(value) {
      const node = createNode(value)

      if (this.head === null) {
        this.head = node
        this.tail = node
        this.length++

        return node
      }

      if (this.tail) {
        this.tail.next = node
        this.tail = node
        this.length++
      }

      return node
    },

    pop() {
      if (this.isEmpty()) {
        return null
      }

      const node = this.tail

      if (this.head === this.tail) {
        this.head = null
        this.tail = null
        this.length--

        return node
      }

      let current = this.head
      let penultimate
      while (current) {
        if (current.next === this.tail) {
          penultimate = current
          break
        }

        current = current.next
      }

      if (penultimate) {
        penultimate.next = null
        this.tail = penultimate
        this.length--
      }

      return node
    },

    get(index) {
      if (index < 0 || index > this.length - 1) {
        return null
      }

      if (index === 0) {
        return this.head
      }

      let current = this.head
      let i = 0
      while (i < index) {
        i++
        current = current && current.next
      }

      return current
    },

    delete(index) {
      if (index < 0 || index > this.length - 1) {
        return null
      }

      if (index === 0) {
        const deleted = this.head

        this.head = this.head && this.head.next
        this.length--

        return deleted
      }

      let current = this.head
      let previous
      let i = 0

      while (i < index) {
        i++
        previous = current
        current = current && current.next
      }

      const deleted = current

      if (previous) {
        previous.next = current && current.next
        if (previous.next === null) {
          this.tail = previous
        }
      }

      this.length--

      return deleted
    },

    isEmpty() {
      return this.length === 0
    },

    print() {
      const values = []
      let current = this.head

      while (current) {
        values.push(current.value)
        current = current.next
      }

      return values.join(' => ')
    },
  }
}
