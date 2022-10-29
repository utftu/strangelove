import Root from '../essential/root';
import AtomAsyncRoot from './atom-async-root';

export default function createStateAtomAsyncRoot<TValue>(
  value: TValue,
  root: Root
): AtomAsyncRoot<TValue>;
