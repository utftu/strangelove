import {runCb} from '../run-cb/run-cb.js';
import {Atom} from '../../atom/atom.js';
import {replaceParents} from '../utils/utils.js';

export async function selectAsyncInners({
  cb,
  value,
  parents,
  root,
  onAtomCreate,
}) {
  const atom = Atom.new({
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
  onAtomCreate(atom);

  const startTransaction = atom.transaction;
  const valueSync = await value;
  if (atom.transaction !== startTransaction) {
    return atom;
  }
  replaceParents(atom, parents);
  atom.value.value = valueSync;

  return atom;
}
