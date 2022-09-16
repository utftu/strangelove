import {select} from '../../essential/index.js';
import {AsyncUserAtom, SyncUserAtom} from '../atom/atom.js';

function userSelect(cb, root) {
  return select(cb, {
    createSyncAtom: (config) => new SyncUserAtom({root, ...config}),
    createAsyncAtom: (config) => new AsyncUserAtom({root, ...config}),
  });
}

export default userSelect;
