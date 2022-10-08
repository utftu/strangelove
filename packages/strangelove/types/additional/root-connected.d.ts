import Root from './essential/root';
import {
  AsyncUserAtom,
  SyncUserAtom,
  UserAtomConfig,
} from './additional/user-atom';
import {selectGetter} from './essential/select';

export class UserRoot extends Root {
  createSyncAtom<TValue>(config: UserAtomConfig<TValue>): SyncUserAtom<TValue>;
  createAsyncAtom<TValue>(
    config: UserAtomConfig<TValue>
  ): AsyncUserAtom<TValue>;
  select: typeof selectGetter;
  createSyncStateAtom<TValue>(value: TValue): SyncUserAtom<TValue>;
}

export default UserRoot;
