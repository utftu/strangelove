import {SyncUserAtom} from './user-atom';

interface Config<TValue> {
  get(): Promise<TValue>;
  set(value: TValue);
  value: TValue;
  needCheckPrev?: boolean;
}

export const createAsyncStore: <TValue>(
  config: Config<TValue>
) => SyncUserAtom<TValue>;
