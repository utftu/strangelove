import {SelectHelpers} from './select';
import {AsyncUserAtom, SyncUserAtom, UserAtomConfig} from './user-atom';

export interface UserSelectConfig<TValue> {
  createAsyncAtom: (config: UserAtomConfig<TValue>) => AsyncUserAtom<TValue>;
  createSyncAtom: (config: UserAtomConfig<TValue>) => SyncUserAtom<TValue>;
}

export type UserSelect = <TValue>(
  helpers: SelectHelpers<TValue>,
  config?: UserSelectConfig<TValue>
) => SyncUserAtom<TValue> | AsyncUserAtom<TValue>;

export default UserSelect;
