import Root from '../../essential/root/root.js';
import {createSyncStore} from '../../essential/value/sync.js';
import {SyncUserAtom, AsyncUserAtom} from '../atom/atom.js';
import userSelect from '../select/select.js';

class UserRoot extends Root {
  createSyncAtom(config) {
    return new SyncUserAtom({root: this, ...config});
  }

  createAsyncAtom(config) {
    return new AsyncUserAtom({
      root: this,
      ...config,
    });
  }

  select(cb) {
    return userSelect(cb, this);
  }

  createSyncStateAtom(value) {
    return this.createSyncAtom({
      value: createSyncStore({
        get() {
          return this.value;
        },
        set(newValue) {
          this.value = newValue;
        },
        value,
      }),
    });
  }
}

export default UserRoot;
