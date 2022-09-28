import {SelectHelpers} from './select';
import {AsyncUserAtom, SyncUserAtom} from './user-atom';

export interface UserSelectConfig<TValue> {
  createAsyncAtom: (config: any) => AsyncUserAtom<TValue>;
  createSyncAtom: (config: any) => SyncUserAtom<TValue>;
}

export type UserSelect = <TValue>(
  helpers: SelectHelpers<TValue>,
  config: UserSelectConfig<TValue>
) => SyncUserAtom<TValue> | AsyncUserAtom<TValue>;

export default UserSelect;
