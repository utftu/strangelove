import {ReadAsync, ReadWriteAsync} from '../../essential/value/async.js';

export function createAsyncStore({get, set, value, needCheckPrev}) {
  if (set) {
    return new ReadWriteAsync({
      get,
      set,
      initValue: value,
      needCheckPrev,
    });
  } else {
    return new ReadAsync({
      get,
      initValue: value,
      needCheckPrev,
    });
  }
}
