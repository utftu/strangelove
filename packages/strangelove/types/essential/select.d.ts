import Atom, {AtomAsync, AtomSync, AtomConfig} from './atom';
import {SelectRootConfig} from '../additional/select-root';
import {AtomRootAsync, AtomRootSync} from '../additional/atom-root';

export interface Config<TValue> {
  createAsyncAtom: (config: AtomConfig<TValue>) => AtomAsync<TValue>;
  createSyncAtom: (config: AtomConfig<TValue>) => AtomSync<TValue>;
}

export function selectGetter<TValue>(
  runFn: (
    getter: <TAtomValue>(a: Atom<TAtomValue>) => TAtomValue,
    config?: SelectRootConfig<TValue>
  ) => TValue
): TValue extends Promise<any> ? AtomRootAsync<TValue> : AtomRootSync<TValue>;

export type Select<TValue, TConfig extends Config<TValue>> = (
  runFn: typeof selectGetter,
  config?: Config<TValue>
) => TValue extends Promise<any> ? AtomAsync<TValue> : AtomSync<TValue>;

export default Select;
