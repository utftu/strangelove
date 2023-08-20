import {Atom, ExecConfig} from '../../atom/atom.ts';
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
  update(atom: Atom, {data}: {data: any} = {data: null}) {
    const startTime = Date.now();
    this.updateSync(atom, {startTime}, {data, initiator: atom, parent: null});

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
  private updateChildren(
    atom: Atom,
    transaction: TransactionKey,
    config: ExecConfig,
  ) {
    for (const childAtom of [...atom.relations.children]) {
      this.updateSync(childAtom, transaction, config);
    }
  }
  private updateSync(
    atom: Atom,
    transaction: TransactionKey,
    config: ExecConfig,
  ) {
    atom.transaction = transaction;

    if (atom.exec(atom, config) === false) {
      return;
    }
    atom.listeners.trigger(atom);

    this.updateChildren(atom, transaction, {...config, parent: atom});
  }
}
