import createControlledPromise from 'utftu/create-controlled-promise.js';
import {DelayedCalls} from '../delayed-calls/delayed-calls.js';

function runOnPromise(maybePromise, cb) {
  if (maybePromise instanceof Promise) {
    maybePromise.then(cb);
  } else {
    cb(maybePromise);
  }
}

export class FastUpdater {
  static new(...args) {
    return new FastUpdater(...args);
  }
  constructor({batch = (cb) => cb()} = {}) {
    this.delayedCalls = new DelayedCalls(batch);
  }
  #transactions = new WeakMap();
  update(atom) {
    const [promise, promiseControls] = createControlledPromise();
    const startTime = Date.now();

    const fullTransaction = {
      promise,
      promiseControls,
      updateCount: 0,
      startTime: Date.now(),
      finishTime: null,
    };

    const transaction = {
      startTime,
    };

    this.#transactions.set(transaction, fullTransaction);

    this.#updateSelect(atom, transaction);

    fullTransaction.promise.startTime = fullTransaction.startTime;
    fullTransaction.promise.finishTime = fullTransaction.finishTime;
    fullTransaction.promise.promise = promise;

    // return fullTransaction.promise;
    return {
      startTime: fullTransaction.startTime,
      finishTime: fullTransaction.finishTime,
      promise: fullTransaction.promise,
    };
  }
  #checkAtomTransaction(atom, transaction) {
    if (atom.transaction === transaction) {
      return false;
    }
    if (atom.transaction?.startTime > transaction.startTime) {
      return false;
    }
    return true;
  }
  #startTransasctionOnAtom(atom, transaction) {
    atom.transaction = transaction;
    const fullTransaction = this.#transactions.get(transaction);
    fullTransaction.updateCount++;
  }
  #finishTransactionOnAtom(transaction) {
    const fullTransaction = this.#transactions.get(transaction);
    fullTransaction.updateCount--;

    this.#checkAndFinishTransaction(transaction);
  }
  #checkAndFinishTransaction(transaction) {
    const transactionStore = this.#transactions.get(transaction);

    if (transactionStore.updateCount === 0) {
      transactionStore.finishTime = Date.now();
      transactionStore.promiseControls.resolve();
    }
  }
  #updateSelect(atom, transaction) {
    if (this.#checkAtomTransaction(atom, transaction) === false) {
      this.#checkAndFinishTransaction(transaction);
      return;
    }
    this.#startTransasctionOnAtom(atom, transaction);

    runOnPromise(atom.exec(atom), (execResult) => {
      if (execResult === false) {
        this.#finishTransactionOnAtom(transaction);
        return;
      }

      this.delayedCalls.add(atom, () => atom.listeners.trigger(atom));

      this.#updateChildren(atom, transaction);
      this.#finishTransactionOnAtom(transaction);
    });
  }
  #updateChildren(atom, transaction) {
    for (const childAtom of [...atom.relations.children]) {
      this.#updateSelect(childAtom, transaction);
    }
  }
}
