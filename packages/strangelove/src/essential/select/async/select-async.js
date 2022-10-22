import {AtomAsync} from '../../atom/atom.js';
import runCb from '../run-cb/run-cb.js';
import selectAsyncInners from './select-async-inners.js';

function selectAsync(cb, createAtom = (config) => new AtomAsync(config)) {
  const {value, parents} = runCb(cb);

  return selectAsyncInners({
    cb,
    value,
    parents,
    createAtom,
  });
}

export default selectAsync;
