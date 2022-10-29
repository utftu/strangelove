import {noop} from '../../consts/consts.js';
import DelayedCalls from '../delayed-calls/delayed-calls.js';

function emptyBatch(cb) {
  cb();
}

class SyncUpdater {
  constructor({batch = emptyBatch} = {}) {
    this.delayedCalls = new DelayedCalls(batch);
  }
  updateCount = 0;
  update(atom, cb = noop) {
    this.updateCount = 0;

    this._updateSync(atom);

    const transaction = {
      promiseControls: {
        resolve: () => {},
        reject: () => {},
      },
      updateCount: this.updateCount,
      startTime: Date.now(),
      endTime: Date.now(),
      cb,
    };
    const promise = Promise.resolve(transaction);
    transaction.promise = promise;
    cb(transaction);

    this.updateCount = 0;
    return promise;
  }
  _updateChildren(atom) {
    for (const childAtom of [...atom.relations.children]) {
      this._updateSync(childAtom);
    }
  }
  _updateSync(atom) {
    if (!atom.onBeforeUpdate(atom)) {
      return;
    }

    if (atom.value?.update() === false) {
      return;
    }

    this.updateCount++;
    this.delayedCalls.add(atom, () => atom.listeners.trigger(atom));

    this._updateChildren(atom);
  }
}

export default SyncUpdater;
