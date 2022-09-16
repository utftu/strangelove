import FastUpdater from '../updaters/fast/index.js';

class Root {
  constructor({updater} = {}) {
    this.updater = updater ?? new FastUpdater();
  }

  update(atom) {
    return this.updater.update(atom);
  }
}

export default Root;
