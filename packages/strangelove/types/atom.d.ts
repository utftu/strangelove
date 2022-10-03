import Listeners from './listeners';
import Relations from './relations';
import {ReadAsync, ReadWriteAsync} from './async-value';
import {ReadSync, ReadWriteSync} from './sync-value';
import UserRoot from './user-root';

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

export class SyncAtom<TValue> extends Atom<TValue> {
  value: ReadWriteSync<TValue> | ReadSync<TValue>;
}

export class SyncUserAtom<TValue> extends SyncAtom<TValue> {
  root: UserRoot;
}

export class AsyncAtom<TValue> extends Atom<TValue> {
  value: ReadWriteSync<TValue> | ReadSync<TValue>;
}

export class AsyncUserAtom<TValue> extends AsyncAtom<TValue> {
  root: UserRoot;
}

export default Atom;
