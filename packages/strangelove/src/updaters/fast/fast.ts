import {createControlledPromise, PromiseControls} from 'utftu';
import {DelayedCalls} from '../delayed-calls/delayed-calls.ts';
import {Atom} from '../../atom/atom.ts';
import {noopBatch} from '../batch.ts';
import {Updater} from '../updaters.ts';

function runOnPromise<TValue>(
  maybePromise: Promise<TValue> | TValue,
  cb: (value: TValue) => void,
) {
  if (maybePromise instanceof Promise) {
    maybePromise.then(cb);
  } else {
    cb(maybePromise);
  }
}

type FastAtom = Atom & {transaction?: TransactionKey};

type PromiseResult = {
  startTime: number;
  finishTime: number;
};

type TransactionKey = {
  startTime: number;
};

type TransactionValue = {
  promise: Promise<PromiseResult>;
  promiseControls: PromiseControls<PromiseResult>;
  startTime: number;
  finishTime: number | null;
  updateCount: number;
};

export class FastUpdater implements Updater {
  static new({batch = noopBatch} = {}) {
    return new FastUpdater({batch});
  }
  delayedCalls: DelayedCalls;
  constructor({batch = noopBatch} = {}) {
    this.delayedCalls = new DelayedCalls(batch);
  }
  private transactions = new WeakMap<TransactionKey, TransactionValue>();
  update(atom: FastAtom) {
    const [promise, promiseControls] = createControlledPromise<PromiseResult>();
    const startTime = Date.now();

    const transactionValue = {
      promise,
      promiseControls,
      updateCount: 0,
      startTime: Date.now(),
      finishTime: null,
    };

    const transactionKey = {
      startTime,
    };

    this.transactions.set(transactionKey, transactionValue);

    this.updateSelect(atom, transactionKey);

    return {
      startTime: transactionValue.startTime,
      finishTime: transactionValue.finishTime,
      promise: transactionValue.promise,
    };
  }
  private checkAtomTransaction(atom: FastAtom, transaction: TransactionKey) {
    if (atom.transaction === transaction) {
      return false;
    }
    if (atom.transaction?.startTime > transaction.startTime) {
      return false;
    }
    return true;
  }
  private startTransasctionOnAtom(atom: FastAtom, transaction: TransactionKey) {
    atom.transaction = transaction;
    const fullTransaction = this.transactions.get(
      transaction,
    ) as TransactionValue;
    fullTransaction.updateCount++;
  }
  private finishTransactionOnAtom(transaction: TransactionKey) {
    const fullTransaction = this.transactions.get(
      transaction,
    ) as TransactionValue;
    fullTransaction.updateCount--;

    this.checkAndFinishTransaction(transaction);
  }
  private checkAndFinishTransaction(transaction: TransactionKey) {
    const transactionValue = this.transactions.get(
      transaction,
    ) as TransactionValue;

    if (transactionValue.updateCount === 0) {
      transactionValue.finishTime = Date.now();
      transactionValue.promiseControls.resolve({
        startTime: transactionValue.startTime,
        finishTime: Date.now(),
      });
    }
  }
  private updateSelect(atom: FastAtom, transaction: TransactionKey) {
    if (this.checkAtomTransaction(atom, transaction) === false) {
      this.checkAndFinishTransaction(transaction);
      return;
    }
    this.startTransasctionOnAtom(atom, transaction);

    runOnPromise(atom.exec(atom), (execResult) => {
      if (execResult === false) {
        this.finishTransactionOnAtom(transaction);
        return;
      }

      this.delayedCalls.add(atom, () => atom.listeners.trigger(atom));

      this.updateChildren(atom, transaction);
      this.finishTransactionOnAtom(transaction);
    });
  }
  private updateChildren(atom: FastAtom, transaction: TransactionKey) {
    for (const childAtom of [...atom.relations.children]) {
      this.updateSelect(childAtom as FastAtom, transaction);
    }
  }
}
