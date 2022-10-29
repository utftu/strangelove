class Root {
  constructor({updater} = {}) {
    this.updater = updater;
  }

  update(atom) {
    return this.updater.update(atom);
  }
}

export default Root;
