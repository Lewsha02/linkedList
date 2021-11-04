export interface INode {
  value: number | string | { [key: string]: any };
  next: LinkedListNode | null;
}

class LinkedListNode implements INode {
  constructor(
    public value: number | string | { [key: string]: any },
    public next: LinkedListNode | null = null
  ) {}
}

export interface INodeList {
  head: LinkedListNode | null;
  tail: LinkedListNode | null;
}

export class LinkedList implements INodeList {
  public head: LinkedListNode | null = null;
  public tail: LinkedListNode | null = null;

  public prepend(value: number | string | {}): LinkedList {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  public append(value: number | string | {}): LinkedList {
    const newNode = new LinkedListNode(value);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  public find(value?: number | string | {} | undefined): LinkedListNode | null {
    if (!this.head) {
      return null;
    }

    let currentNode: LinkedListNode | null = this.head;

    while (currentNode) {
      if (value !== undefined && currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  public deleteTail(): LinkedListNode | null {
    if (!this.tail) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head;
    while (currentNode && currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  public deleteHead(): LinkedListNode | null {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  public delete(value: number | string | {}): LinkedListNode | null {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    while (this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail && this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  }
}
