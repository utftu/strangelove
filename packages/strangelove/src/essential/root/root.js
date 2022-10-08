import FastUpdater from '../updaters/fast/fast.js';

class Root {
  constructor({updater} = {}) {
    this.updater = updater ?? new FastUpdater();
  }

  update(atom) {
    return this.updater.update(atom);
  }
}

export default Root;
