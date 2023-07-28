import {Cb, runCb} from '../run-cb/run-cb.ts';
import {Atom} from '../../atom/atom.ts';
import {replaceParents} from '../utils/utils.ts';
import {Root} from '../../root/root.ts';
import {OnAtomCreate} from '../select.ts';

type Props<TValue> = {
  cb: Cb;
  value: TValue;
  parents: Set<Atom>;
  root: Root;
  onAtomCreate: OnAtomCreate;
};

export function selectSyncInners<TValue>({
  cb,
  value,
  parents,
  root,
  onAtomCreate,
}: Props<TValue>) {
  const atom = Atom.new({
    value,
    root,
    exec(atom: Atom<TValue>) {
      const {value, parents} = runCb<TValue>(cb);
      replaceParents(atom, parents);
      return atom.value.set(value as TValue);
    },
  });
  replaceParents(atom, parents);

  onAtomCreate(atom);

  return atom;
}
