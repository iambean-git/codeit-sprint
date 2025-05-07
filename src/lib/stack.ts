class Stack {
  public items: string[];

  constructor() {
    this.items = [];
  }

  add(element: string) {
    this.items.push(element);
  }

  remove() {
    return this.items.pop();
  }
}
