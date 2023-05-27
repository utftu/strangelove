import {DelayedCalls} from '../delayed-calls/delayed-calls.js';

export class SyncUpdater {
  static new(...args) {
    return new SyncUpdater(...args);
  }

  constructor({batch = (cb) => cb()} = {}) {
    this.delayedCalls = new DelayedCalls(batch);
  }
  update(atom) {
    const startTime = Date.now();
    this.#updateSync(atom, {startTime});

    return {
      promise: Promise.resolve(),
      startTime,
      finishTime: Date.now(),
    };
  }
  #updateChildren(atom, transaction) {
    for (const childAtom of [...atom.relations.children]) {
      this.#updateSync(childAtom, transaction);
    }
  }
  #updateSync(atom, transaction) {
    atom.transaction = transaction;

    if (atom.exec() === false) {
      return;
    }

    // this.delayedCalls.add(atom, () => atom.listeners.trigger(atom));

    this.#updateChildren(atom, transaction);
  }
}
