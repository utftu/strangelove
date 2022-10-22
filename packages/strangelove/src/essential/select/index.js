import selectSyncInners from './sync/select-sync-inners.js';
import selectAsyncInners from './async/select-async-inners.js';
import runCb from './run-cb/run-cb.js';
import {AtomAsync, AtomSync} from '../atom/atom.js';

export default function select(
  cb,
  {
    createAsyncAtom = (config) => new AtomAsync(config),
    createSyncAtom = (config) => new AtomSync(config),
  } = {}
) {
  const {value, parents} = runCb(cb);

  if (value instanceof Promise) {
    return selectAsyncInners({
      cb,
      value,
      parents,
      createAtom: createAsyncAtom,
    });
  } else {
    return selectSyncInners({
      cb,
      value,
      parents,
      createAtom: createSyncAtom,
    });
  }
}
