import AtomAsyncRoot from './atom-async-root';
import AtomSyncRoot from './atom-sync-root';
import {getter} from '../essential/select';
import Root from '../essential/root';

export function selectRoot<TReturnValue>(
  cb: (get: typeof getter) => TReturnValue,
  root: Root
): TReturnValue extends Promise<infer Item>
  ? AtomAsyncRoot<Item>
  : AtomSyncRoot<TReturnValue>;

export default selectRoot;
