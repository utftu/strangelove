import AtomAsyncRoot from './atom-async-root';
import AtomSyncRoot from './atom-sync-root';
import {AtomAsyncProps} from '../essential/atom-async';
import {AtomSyncProps} from '../essential/atom-sync';
import {getter} from '../essential/select';

export interface SelectRootConfig<TValue> {
  createAsyncAtom: (config: AtomAsyncProps<TValue>) => AtomAsyncRoot<TValue>;
  createSyncAtom: (config: AtomSyncProps<TValue>) => AtomSyncRoot<TValue>;
}

export function selectRoot<TReturnValue>(
  cb: (get: typeof getter) => TReturnValue,
  config?: SelectRootConfig<
    TReturnValue extends Promise<infer Item> ? Item : TReturnValue
  >
): TReturnValue extends Promise<infer Item>
  ? AtomAsyncRoot<Item>
  : AtomSyncRoot<TReturnValue>;

export default selectRoot;
