import {runCb} from '../run-cb/run-cb.js';
import {Select} from '../select.js';
import {replaceParents} from '../utils.js';

export function selectSyncInners({cb, value, parents, root}) {
  const atom = Select.new({
    value,
    root,
    exec(atom) {
      const {value, parents} = runCb(cb);
      replaceParents(atom, parents);
      return atom.value.set(value);
    },
  });
  replaceParents(atom, parents);

  return atom;
}
