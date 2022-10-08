import {selectGetter} from '../essential/select';
import {AtomRootAsync, AtomRootSync, AtomRootConfig} from './atom-root';

export interface SelectRootConfig<TValue> {
  createAsyncAtom: (config: AtomRootConfig<TValue>) => AtomRootAsync<TValue>;
  createSyncAtom: (config: AtomRootConfig<TValue>) => AtomRootSync<TValue>;
}

export type SelectRoot = <TValue>(
  runFn: typeof selectGetter,
  config?: SelectRootConfig<TValue>
) => TValue extends Promise<any> ? AtomRootAsync<TValue> : AtomRootSync<TValue>;

export default SelectRoot;
