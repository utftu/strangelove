import {AtomSync} from '../../atom/atom.js';
import createControlledPromise from 'utftu/create-controlled-promise.js';
import {noop} from '../../consts/consts.js';
import DelayedCalls from './delayed-calls.js';

const transactionAtomKey = Symbol('transaction');

class FastUpdater {
  delayedCalls = new DelayedCalls();
  transactions = new WeakMap();
  update(atom, cb = noop) {
    const [promise, promiseControls] = createControlledPromise();
    const transactionKey = {};

    this.transactions.set(transactionKey, {
      promise,
      promiseControls,
      updateCount: 0,
      startTime: Date.now(),
      endTime: null,
      cb,
    });
    this._updateSelect(atom, transactionKey);
    return promise;
  }
  _startTransactionOnAtom(transactionKey) {
    this.transactions.get(transactionKey).updateCount++;
  }
  _finishTransactionOnAtom(transactionKey) {
    const transaction = this.transactions.get(transactionKey);
    transaction.updateCount--;
    if (transaction.updateCount === 0) {
      transaction.endTime = Date.now();
      transaction.promiseControls.resolve(transaction);
      transaction.cb(transaction);
    }
  }
  _checkTimeAllowUpdate(atom, transaction) {
    if (!atom[transactionAtomKey]) {
      return true;
    }
    const atomTransactionTime = this.transactions.get(
      atom[transactionAtomKey]
    ).startTime;
    const updateTransactionTime = this.transactions.get(transaction).startTime;
    if (atomTransactionTime > updateTransactionTime) {
      return false;
    }
    return true;
  }
  _updateSelect(atom, transaction) {
    if (atom instanceof AtomSync) {
      this._updateSync(atom, transaction);
    } else {
      this._updateAsync(atom, transaction);
    }
  }
  _updateChildren(atom, transaction) {
    for (const childAtom of [...atom.relations.children]) {
      this._updateSelect(childAtom, transaction);
    }
  }
  _updateSync(atom, transaction) {
    this._startTransactionOnAtom(transaction);
    if (!this._checkTimeAllowUpdate(atom, transaction)) {
      this._finishTransactionOnAtom(transaction);
      return;
    }

    if (!atom.onBeforeUpdate(atom)) {
      this._finishTransactionOnAtom(transaction);
      return;
    }

    atom.value?.update();

    atom[transactionAtomKey] = transaction;
    this.delayedCalls.add(atom, () => atom.listeners.trigger(atom));

    this._updateChildren(atom, transaction);
    this._finishTransactionOnAtom(transaction);
  }
  async _updateAsync(atom, transaction) {
    this._startTransactionOnAtom(transaction);
    if (!this._checkTimeAllowUpdate(atom, transaction)) {
      this._finishTransactionOnAtom(transaction);
      return;
    }

    if (!(await atom.onBeforeUpdate(atom))) {
      this._finishTransactionOnAtom(transaction);
      return;
    }

    if (!this._checkTimeAllowUpdate(atom, transaction)) {
      this._finishTransactionOnAtom(transaction);
      return;
    }

    await atom.value?.update();

    if (!this._checkTimeAllowUpdate(atom, transaction)) {
      this._finishTransactionOnAtom(transaction);
      return;
    }

    atom[transactionAtomKey] = transaction;
    this.delayedCalls.add(atom, () => atom.listeners.trigger(atom));

    this._updateChildren(atom, transaction);
    this._finishTransactionOnAtom(transaction);
  }
}

export default FastUpdater;
