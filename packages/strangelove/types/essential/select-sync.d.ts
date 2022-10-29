import Atom from './atom';
import AtomSync from './atom-sync';

type Cb<TValue> = (
  getter: <TAtomValue>(atom: Atom<TAtomValue>) => TAtomValue
) => TValue | undefined;

export function selectSync<TValue>(
  cb: Cb<TValue>,
  createAtomSync?: <TAtom extends AtomSync<TValue>>() => TAtom
): AtomSync<TValue>;

export default selectSync;
