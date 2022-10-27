import ReadWriteValueSync from './read-write-value-sync.js';

function createStateValueSync(value) {
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

export default createStateValueSync;
