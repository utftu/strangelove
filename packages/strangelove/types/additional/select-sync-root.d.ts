import AtomSyncRoot from './atom-sync-root';
import Atom from '../essential/atom';

type Cb<TValue> = (
  getter: <TAtomValue>(atom: Atom<TAtomValue>) => TAtomValue
) => TValue | undefined;

export function selectSync<TValue>(
  cb: Cb<TValue>,
  createAtomSync?: <TAtom extends AtomSyncRoot<TValue>>() => TAtom
): AtomSyncRoot<TValue>;

export default selectSync;
