import {ReadSync, ReadWriteSync} from '../../essential/value/sync.js';

export function createSyncStore({get, set, value, needCheckPrev}) {
  if (set) {
    return new ReadWriteSync({
      get,
      set,
      value,
      needCheckPrev,
    });
  } else {
    return new ReadSync({
      get,
      value,
      needCheckPrev,
    });
  }
}
