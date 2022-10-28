import createValueSync from '../../essential/value/sync/create-value-sync.js';
import createAtomSyncRoot from './create-atom-sync-root.js';

function createStateAtomSyncRoot(value, root) {
  return createAtomSyncRoot(
    {
      value: createValueSync({
        get() {
          return value;
        },
        set(newValue) {
          value = newValue;
        },
        value,
      }),
    },
    root
  );
}

export default createStateAtomSyncRoot;
