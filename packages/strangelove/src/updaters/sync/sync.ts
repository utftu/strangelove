import {Atom} from '../../atom/atom.ts';
import {Batch, noopBatch} from '../batch.ts';
import {DelayedCalls} from '../delayed-calls/delayed-calls.ts';
import {TransactionKey, Updater} from '../updaters.ts';

export class SyncUpdater implements Updater {
  static new(config?: {batch?: Batch}) {
    return new SyncUpdater(config);
  }
  delayedCalls: DelayedCalls;
  constructor({batch = noopBatch} = {}) {
    this.delayedCalls = new DelayedCalls(batch);
  }
  update(atom: Atom) {
    const startTime = Date.now();
    this.updateSync(atom, {startTime});

    const finishTime = Date.now();
    return {
      promise: Promise.resolve({
        startTime,
        finishTime,
      }),
      startTime,
      finishTime,
    };
  }
  private updateChildren(atom: Atom, transaction: TransactionKey) {
    for (const childAtom of [...atom.relations.children]) {
      this.updateSync(childAtom, transaction);
    }
  }
  private updateSync(atom: Atom, transaction: TransactionKey) {
    atom.transaction = transaction;

    if (atom.exec(atom) === false) {
      return;
    }

    this.updateChildren(atom, transaction);
  }
}
