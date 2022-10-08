import Root from '../../essential/root/root.js';
import {createStoreSync} from '../../essential/value/sync.js';
import {AtomRootSync, AtomRootAsync} from '../atom/atom.js';
import selectRoot from '../select/select.js';

class RootConnected extends Root {
  createAtomSync(config) {
    return new AtomRootSync({root: this, ...config});
  }

  createAtomAsync(config) {
    return new AtomRootAsync({
      root: this,
      ...config,
    });
  }

  select(cb) {
    return selectRoot(cb, this);
  }

  createStateAtomSync(value) {
    return this.createAtomSync({
      value: createStoreSync({
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

  createStateAtomAsync(value) {
    return this.createAtomSync({
      value: createStoreSync({
        async get() {
          return this.value;
        },
        async set(newValue) {
          this.value = newValue;
        },
        value,
      }),
    });
  }
}

export default RootConnected;
