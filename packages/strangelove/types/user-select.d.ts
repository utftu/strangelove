import {Helpers} from './select';
import {AsyncUserAtom, SyncUserAtom} from './user-atom';

declare interface Config<TValue> {
  createAsyncAtom: (config: any) => AsyncUserAtom<TValue>;
  createSyncAtom: (config: any) => SyncUserAtom<TValue>;
}

declare const userSelect: <TValue>(
  helpers: Helpers<TValue>,
  config: Config<TValue>
) => SyncUserAtom<TValue> | AsyncUserAtom<TValue>;

export default userSelect;
