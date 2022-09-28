import type {Root, SelectHelpers, UserSelectConfig} from 'strangelove';
import {AsyncUserAtom, SyncUserAtom} from 'strangelove/types/user-atom';

export type UseStrangeLoveSelect<TValue> = (
  cb: (helpers: SelectHelpers<TValue>, config: UserSelectConfig<TValue>) => any,
  customRoot?: Root
) => SyncUserAtom<TValue> | AsyncUserAtom<TValue>;
