import {runCb} from '../run-cb/run-cb.js';
import {Atom} from '../../atom/atom.js';
import {replaceParents} from '../utils/utils.js';

export function selectSyncInners({cb, value, parents, root, onAtomCreate}) {
  const atom = Atom.new({
    value,
    root,
    exec(atom) {
      const {value, parents} = runCb(cb);
      replaceParents(atom, parents);
      return atom.value.set(value);
    },
  });
  replaceParents(atom, parents);

  onAtomCreate(atom);

  return atom;
}
