import {ReadSync, ReadWriteSync} from '../../essential/value/sync.js';

export function createSyncStore({set, ...config}) {
  if (set) {
    return new ReadWriteSync({
      set,
      ...config,
    });
  } else {
    return new ReadSync({
      ...config,
    });
  }
}
