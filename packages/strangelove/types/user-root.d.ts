import Root from './root';
import {AsyncUserAtom, SyncUserAtom, UserAtomConfig} from './user-atom';
import {UserSelect} from './user-select';

export class UserRoot extends Root {
  createSyncAtom<TValue>(config: UserAtomConfig<TValue>): SyncUserAtom<TValue>;
  createAsyncAtom<TValue>(
    config: UserAtomConfig<TValue>
  ): AsyncUserAtom<TValue>;
  select: UserSelect;
  createSyncStateAtom<TValue>(value: TValue): SyncUserAtom<TValue>;
}

export default UserRoot;
