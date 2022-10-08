import Listeners from './listeners';
import Relations from './relations';
import {ReadAsync, ReadWriteAsync} from './async-value';
import {ReadSync, ReadWriteSync} from './sync-value';
import RootConnected from '../additional/root-connected';

type AtomValues<TValue> =
  | ReadAsync<TValue>
  | ReadWriteAsync<TValue>
  | ReadWriteSync<TValue>
  | ReadSync<TValue>;

export interface AtomConfig<TValue> {
  value: AtomValues<TValue>;
  onBeforeUpdate: () => boolean;
  onUpdate: () => void;
}

export abstract class Atom<TValue = any> {
  connect(parent: Atom, child: Atom);
  disconnect(parent: Atom, child: Atom);
  constructor(config: AtomConfig<TValue>);

  value: AtomValues<TValue>;
  listeners: Listeners<TValue>;
  relations: Relations;
}

export class AtomSync<TValue> extends Atom<TValue> {
  value: ReadWriteSync<TValue> | ReadSync<TValue>;
}

export class AtomRootSync<TValue> extends AtomSync<TValue> {
  root: RootConnected;
}

export class AtomAsync<TValue> extends Atom<TValue> {
  value: ReadWriteSync<TValue> | ReadSync<TValue>;
}

export class AtomRootAsync<TValue> extends AtomAsync<TValue> {
  root: RootConnected;
}

export default Atom;
