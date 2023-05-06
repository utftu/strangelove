export class Root {
  static new(...args) {
    return new Root(...args);
  }

  constructor({updater} = {}) {
    this.updater = updater;
  }

  update(atom) {
    return this.updater.update(atom);
  }
}
