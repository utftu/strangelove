import createValueSync from '../../essential/value/sync/create-value-sync.js';
import createAtomSyncRoot from './create-atom-sync.js';

function createStateAtomSync(value, root) {
  return createAtomSyncRoot(
    {
      value: createValueSync({
        get() {
          return this.value;
        },
        set(newValue) {
          this.value = newValue;
        },
        value,
      }),
    },
    root
  );
}

export default createStateAtomSync;
