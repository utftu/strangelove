import {AtomState} from '../atom-state/atom-state.js';
import {Root} from '../root/root.js';
import {FastUpdater} from '../updaters/fast/fast.js';
import {select as selectBase} from '../select/select.js';

const root = Root.new({
  updater: FastUpdater.new(),
});

export function atom(value) {
  return AtomState.new({value, root});
}

export function select(cb) {
  return selectBase(cb, {root});
}
