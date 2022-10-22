import {createStoreSync} from '../../essential/index.js';
import createValueAsync from '../../essential/value/async/create-value-async.js';
import createAtomAsyncRoot from './create-atom-async.js';

function createStateAtomAsync(value, root) {
  return createAtomAsyncRoot(
    {
      value: createValueAsync({
        async get() {
          return this.value;
        },
        async set(newValue) {
          this.value = newValue;
        },
        value,
      }),
    },
    root
  );
}

export default createStateAtomAsync;
