import selectSync from './sync.js';
import selectAsync from './async.js';
import runCb from './run-cb.js';
import {AsyncAtom, SyncAtom} from '../atom/atom.js';

export default function select(
  cb,
  {
    createAsyncAtom = (config) => new AsyncAtom(config),
    createSyncAtom = (config) => new SyncAtom(config),
  } = {}
) {
  const {value, parents} = runCb(cb);

  if (value instanceof Promise) {
    return selectAsync({
      cb,
      value,
      parents,
      createAtom: createAsyncAtom,
    });
  } else {
    return selectSync({
      cb,
      value,
      parents,
      createAtom: createSyncAtom,
    });
  }
}
