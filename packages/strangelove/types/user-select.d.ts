import {selectGetter} from './select';
import {AsyncUserAtom, SyncUserAtom, UserAtomConfig} from './user-atom';

export interface UserSelectConfig<TValue> {
  createAsyncAtom: (config: UserAtomConfig<TValue>) => AsyncUserAtom<TValue>;
  createSyncAtom: (config: UserAtomConfig<TValue>) => SyncUserAtom<TValue>;
}

export type UserSelect = <TValue>(
  runFn: typeof selectGetter,
  config?: UserSelectConfig<TValue>
) => TValue extends Promise<any> ? AsyncUserAtom<TValue> : SyncUserAtom<TValue>;

export default UserSelect;
