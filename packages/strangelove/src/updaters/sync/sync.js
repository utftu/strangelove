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

    const externalTransaction = {
      promiseControls: {
        resolve: () => {},
        reject: () => {},
      },
      updateCount: 0,
      startTime,
      endTime: startTime,
    };
    const promise = Promise.resolve(externalTransaction);
    externalTransaction.promise = promise;
    return externalTransaction;
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

    this.delayedCalls.add(atom, () => atom.listeners.trigger(atom));

    this.#updateChildren(atom, transaction);
  }
}
