import ReadValueSync from './read-value-sync.js';
import ReadWriteValueSync from './read-write-value-sync.js';

export default function createValueSync({set, ...config}) {
  if (set) {
    return new ReadWriteValueSync({
      set,
      ...config,
    });
  } else {
    return new ReadValueSync({
      ...config,
    });
  }
}
