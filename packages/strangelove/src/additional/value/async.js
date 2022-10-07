import {AsyncRead, AsyncReadWrite} from '../../essential/value/async.js';

export function createAsyncStore({get, set, value, needCheckPrev}) {
  if (set) {
    return new AsyncReadWrite({
      get,
      set,
      initValue: value,
      needCheckPrev,
    });
  } else {
    return new AsyncRead({
      get,
      initValue: value,
      needCheckPrev,
    });
  }
}
