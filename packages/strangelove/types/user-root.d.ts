import Root from './root';
import {AsyncUserAtom, SyncUserAtom, UserAtomConfig} from './user-atom';
import userSelect from './user-select';

export class UserRoot extends Root {
  createSyncAtom<TValue>(config: UserAtomConfig<TValue>): SyncUserAtom<TValue>;
  createAsyncAtom<TValue>(
    config: UserAtomConfig<TValue>
  ): AsyncUserAtom<TValue>;
  select: typeof userSelect;
  createSyncStateAtom<TValue>(value: TValue): SyncUserAtom<TValue>;
}

export default UserRoot;
