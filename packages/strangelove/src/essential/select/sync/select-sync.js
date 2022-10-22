import {AtomSync} from '../../atom/atom.js';
import runCb from '../run-cb/run-cb.js';
import selectSyncInners from './select-sync-inners.js';

function selectSync(cb, createAtom = (config) => new AtomSync(config)) {
  const {value, parents} = runCb(cb);

  return selectSyncInners({
    cb,
    value,
    parents,
    createAtom,
  });
}

export default selectSync;
