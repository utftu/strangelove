import AtomAsyncRoot from './atom-async-root';
import Atom from '../essential/atom';

type Cb<TValue> = (
  getter: <TAtomValue>(atom: Atom<TAtomValue>) => TAtomValue
) => Promise<TValue> | undefined;

export function selectAsync<TValue>(
  cb: Cb<TValue>,
  createAtomAsync?: <TAtom extends AtomAsyncRoot<TValue>>() => TAtom
): AtomAsyncRoot<TValue>;

export default selectAsync;
