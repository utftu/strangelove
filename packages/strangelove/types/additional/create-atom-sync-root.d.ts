import {AtomSyncProps} from '../essential/atom-sync';
import Root from '../essential/root';
import AtomSyncRoot from './atom-sync-root';

export default function createAtomSyncRoot<TValue>(
  config: AtomSyncProps<TValue>,
  root: Root
): AtomSyncRoot<TValue>;
