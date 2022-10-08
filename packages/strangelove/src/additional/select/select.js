import {select} from '../../essential/index.js';
import {AtomRootAsync, AtomRootSync} from '../atom/atom.js';

function selectRoot(cb, root) {
  return select(cb, {
    createSyncAtom: (config) => new AtomRootSync({root, ...config}),
    createAsyncAtom: (config) => new AtomRootAsync({root, ...config}),
  });
}

export default selectRoot;
