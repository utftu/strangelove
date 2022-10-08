import {ReadAsync, ReadWriteAsync} from '../../essential/value/async.js';

export function createAsyncStore({set, ...config}) {
  if (set) {
    return new ReadWriteAsync({
      set,
      ...config,
    });
  } else {
    return new ReadAsync({
      ...config,
    });
  }
}
