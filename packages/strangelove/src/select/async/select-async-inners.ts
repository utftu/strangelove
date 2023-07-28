import {Cb, runCb} from '../run-cb/run-cb.ts';
import {Atom} from '../../atom/atom.ts';
import {replaceParents} from '../utils/utils.js';
import {Root} from '../../root/root.ts';
import {OnAtomCreate} from '../select.ts';

type Props<TValue> = {
  cb: Cb;
  value: Promise<TValue>;
  parents: Set<Atom>;
  root: Root;
  onAtomCreate: OnAtomCreate;
};

export async function selectAsyncInners<TValue>({
  cb,
  value,
  parents,
  root,
  onAtomCreate,
}: Props<TValue>) {
  const atom = Atom.new<TValue>({
    root,
    async exec(atom: Atom<TValue>) {
      const {value, parents} = runCb(cb);
      const startTransaction = atom.transaction;
      const valueSync = await (value as Promise<TValue>);
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
