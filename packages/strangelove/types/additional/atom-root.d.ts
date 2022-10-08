import Atom, {AtomConfig} from '../essential/atom';
import RootConnected from './root-connected';

export interface AtomRootConfig<TValue> extends AtomConfig<TValue> {
  root: RootConnected;
  name?: string;
}

export class AtomRootSync<TValue> extends Atom<TValue> {
  constructor(config: AtomRootConfig<TValue>);
  root: RootConnected;
  name?: string;
  get(): TValue;
  set(data: TValue): boolean;
}

export class AtomRootAsync<TValue> extends Atom<TValue> {
  constructor(config: AtomRootConfig<TValue>);
  root: RootConnected;
  name?: string;
  get(): Promise<TValue>;
  set(data: TValue): Promise<boolean>;
}
