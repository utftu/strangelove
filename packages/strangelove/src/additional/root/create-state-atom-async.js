import createValueAsync from '../../essential/value/async/create-value-async.js';
import createAtomAsyncRoot from './create-atom-async-root.js';

function createStateAtomAsync(value, root) {
  return createAtomAsyncRoot(
    {
      value: createValueAsync({
        async get() {
          return value;
        },
        async set(newValue) {
          value = newValue;
        },
        value,
      }),
    },
    root
  );
}

export default createStateAtomAsync;
