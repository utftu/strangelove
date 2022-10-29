import AtomSyncRoot from './atom-sync-root';
import Root from '../essential/root';

export default function createStateAtomSyncRoot<TValue>(
  value: TValue,
  root: Root
): AtomSyncRoot<TValue>;
