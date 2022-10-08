import Atom, {AtomAsync, AtomSync, AtomConfig} from './essential/atom';
import {UserSelectConfig} from './user-select';
import {AsyncUserAtom, SyncUserAtom} from './user-atom';

export interface Config<TValue> {
  createAsyncAtom: (config: AtomConfig<TValue>) => AtomAsync<TValue>;
  createSyncAtom: (config: AtomConfig<TValue>) => AtomSync<TValue>;
}

export function selectGetter<TValue>(
  runFn: (
    getter: <TAtomValue>(a: Atom<TAtomValue>) => TAtomValue,
    config?: UserSelectConfig<TValue>
  ) => TValue
): TValue extends Promise<any> ? AsyncUserAtom<TValue> : SyncUserAtom<TValue>;

export type Select<TValue, TConfig extends Config<TValue>> = (
  runFn: typeof selectGetter,
  config?: Config<TValue>
) => TValue extends Promise<any> ? AtomAsync<TValue> : AtomSync<TValue>;

export default Select;
