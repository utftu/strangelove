import Atom, {AsyncAtom, SyncAtom, AtomConfig} from './atom';
import {UserSelectConfig} from './user-select';
import {AsyncUserAtom, SyncUserAtom} from './user-atom';

export interface Config<TValue> {
  createAsyncAtom: (config: AtomConfig<TValue>) => AsyncAtom<TValue>;
  createSyncAtom: (config: AtomConfig<TValue>) => SyncAtom<TValue>;
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
) => TValue extends Promise<any> ? AsyncAtom<TValue> : SyncAtom<TValue>;

export default Select;
