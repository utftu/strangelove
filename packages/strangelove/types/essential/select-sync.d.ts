import {Atom, AtomSync} from './atom';

type Cb<TValue> = (
  getter: <TAtomValue>(atom: Atom<TAtomValue>) => TAtomValue
) => TValue | undefined;

export function selectSync<TValue>(
  cb: Cb<TValue>,
  createAtomSync?: <TAtom extends AtomSync<TValue>>() => TAtom
): AtomSync<TValue>;

export default selectSync;
