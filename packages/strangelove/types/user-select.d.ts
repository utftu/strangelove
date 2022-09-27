import {Helpers} from './select';
import {AsyncUserAtom, SyncUserAtom} from './user-atom';

export interface Config<TValue> {
  createAsyncAtom: (config: any) => AsyncUserAtom<TValue>;
  createSyncAtom: (config: any) => SyncUserAtom<TValue>;
}

export const userSelect: <TValue>(
  helpers: Helpers<TValue>,
  config: Config<TValue>
) => SyncUserAtom<TValue> | AsyncUserAtom<TValue>;

export default userSelect;
