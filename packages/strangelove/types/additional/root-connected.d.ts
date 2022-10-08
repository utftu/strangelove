import Root from '../essential/root';
import {AtomRootAsync, AtomRootSync, AtomRootConfig} from './atom-root';
import {selectGetter} from '../essential/select';

export class RootConnected extends Root {
  createAtomSync<TValue>(config: AtomRootConfig<TValue>): AtomRootSync<TValue>;
  createAtomAsync<TValue>(
    config: AtomRootConfig<TValue>
  ): AtomRootAsync<TValue>;
  select: typeof selectGetter;
  createStateAtomSync<TValue>(value: TValue): AtomRootSync<TValue>;
  createStateAtomAsync<TValue>(value: TValue): AtomRootAsync<TValue>;
}

export default RootConnected;
