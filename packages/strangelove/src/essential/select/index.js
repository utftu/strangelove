import selectSync from './sync.js';
import selectAsync from './async.js';
import runCb from './run-cb.js';
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
