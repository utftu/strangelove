import {selectSyncInners} from './sync/select-sync-inners.js';
import {selectAsyncInners} from './async/select-async-inners.js';
import {runCb} from './run-cb/run-cb.js';

export function select(cb, {root, onAtomCreate}) {
  const {value, parents} = runCb(cb);

  if (value instanceof Promise) {
    return selectAsyncInners({
      cb,
      value,
      parents,
      root,
      onAtomCreate,
    });
  } else {
    return selectSyncInners({
      cb,
      value,
      parents,
      root,
      onAtomCreate,
    });
  }
}
