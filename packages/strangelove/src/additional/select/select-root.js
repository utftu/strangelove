import {select} from '../../essential/index.js';
import AtomSyncRoot from '../atom/atom-sync-root.js';
import AtomAsyncRoot from '../atom/atom-async-root.js';

function selectRoot(cb, root) {
  return select(cb, {
    createSyncAtom: (config) => new AtomSyncRoot({root, ...config}),
    createAsyncAtom: (config) => new AtomAsyncRoot({root, ...config}),
  });
}

export default selectRoot;
