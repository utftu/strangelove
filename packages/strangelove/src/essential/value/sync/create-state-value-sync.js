import ReadWriteValueSync from './read-write-value-sync.js';

function createValueSync(value) {
  return new ReadWriteValueSync({
    get() {
      return value;
    },
    set(newValue) {
      value = newValue;
    },
    value,
  });
}

export default createValueSync;
