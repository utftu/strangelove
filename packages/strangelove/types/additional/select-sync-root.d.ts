import AtomSyncRoot from './atom-sync-root';
import Atom from '../essential/atom';
import Root from '../essential/root';

type Cb<TValue> = (
  getter: <TAtomValue>(atom: Atom<TAtomValue>) => TAtomValue
) => TValue | undefined;

export function selectSyncRoot<TValue>(
  cb: Cb<TValue>,
  root: Root
): AtomSyncRoot<TValue>;

export default selectSyncRoot;
