import {runCb} from '../run-cb/run-cb.js';
import {Select} from '../select.js';
import {replaceParents} from '../utils.js';

export async function selectAsyncInners({cb, value, parents, root}) {
  const atom = Select.new({
    root,
    async exec(atom) {
      const {value, parents} = runCb(cb);
      const startTransaction = atom.transaction;
      const valueSync = await value;
      if (atom.transaction !== startTransaction) {
        return false;
      }
      replaceParents(atom, parents);
      atom.value.set(valueSync);
      return true;
    },
  });

  const startTransaction = atom.transaction;
  const valueSync = await value;
  if (atom.transaction !== startTransaction) {
    return atom;
  }
  replaceParents(atom, parents);
  atom.value.value = valueSync;

  return atom;
}
