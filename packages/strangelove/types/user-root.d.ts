import Root from './root';
import {AsyncUserAtom, SyncUserAtom, UserAtomConfig} from './user-atom';
import {selectGetter} from './select';

export class UserRoot extends Root {
  createSyncAtom<TValue>(config: UserAtomConfig<TValue>): SyncUserAtom<TValue>;
  createAsyncAtom<TValue>(
    config: UserAtomConfig<TValue>
  ): AsyncUserAtom<TValue>;
  select: typeof selectGetter;
  createSyncStateAtom<TValue>(value: TValue): SyncUserAtom<TValue>;
}

export default UserRoot;
