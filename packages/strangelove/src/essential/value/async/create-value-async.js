import ReadValueAsync from './read-value-async.js';
import ReadWriteValueAsync from './read-write-value-async.js';

function createValueAsync({set, ...config}) {
  if (set) {
    return new ReadWriteValueAsync({
      set,
      ...config,
    });
  } else {
    return new ReadValueAsync({
      ...config,
    });
  }
}

export default createValueAsync;
