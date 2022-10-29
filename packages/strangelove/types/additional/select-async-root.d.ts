import AtomAsyncRoot from './atom-async-root';
import Atom from '../essential/atom';
import Root from '../essential/root';

type Cb<TValue> = (
  getter: <TAtomValue>(atom: Atom<TAtomValue>) => TAtomValue
) => Promise<TValue> | undefined;

export function selectAsyncRoot<TValue>(
  cb: Cb<TValue>,
  root: Root
): AtomAsyncRoot<TValue>;

export default selectAsyncRoot;
