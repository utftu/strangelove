import type {Root, UserSelectConfig} from 'strangelove';
import {AsyncUserAtom, SyncUserAtom} from 'strangelove/types/user-atom';
import {Atom} from 'strangelove';

export function useStrangeLoveSelect<TValue>(
  cb: (
    helpers: <TValue>(atom: Atom<TValue>) => TValue,
    config: UserSelectConfig<TValue>
  ) => TValue,
  customRoot?: Root
): [
  TValue,
  TValue extends Promise<any> ? AsyncUserAtom<TValue> : SyncUserAtom<TValue>
];
