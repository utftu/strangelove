export class Relations {
  static new(...args) {
    return new Relations(...args);
  }

  parents = new Set();
  children = new Set();
}
