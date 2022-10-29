import Root from '../essential/root';
import {AtomAsyncProps} from '../essential/atom-async';
import AtomAsyncRoot from './atom-async-root';

export default function createAtomAsyncRoot<TValue>(
  config: AtomAsyncProps<TValue>,
  root: Root
): AtomAsyncRoot<TValue>;
