import {Atom, AtomAsync} from './atom';

type Cb<TValue> = (
  getter: <TAtomValue>(atom: Atom<TAtomValue>) => TAtomValue
) => Promise<TValue> | undefined;

export function selectAsync<TValue>(
  cb: Cb<TValue>,
  createAtomAsync?: <TAtom extends AtomAsync<TValue>>() => TAtom
): AtomAsync<TValue>;

export default selectAsync;
