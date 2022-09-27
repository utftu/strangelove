import Listeners from './listeners';
import Relations from './relations';

type AtomValues<TValue> =
  | ReadAsync<TValue>
  | ReadWriteAsync<TValue>
  | ReadWriteSync<TValue>
  | ReadSync<TValue>;

export declare interface AtomConfig<TValue> {
  value: AtomValues<TValue>;
  onBeforeUpdate: () => boolean;
  onUpdate: () => void;
}

declare class Atom<TValue = any> {
  connect(parent: Atom, child: Atom);
  disconnect(parent: Atom, child: Atom);
  constructor(config: AtomConfig<TValue>);

  value: AtomValues<TValue>;
  listeners: Listeners<TValue>;
  relations: Relations;
}

export declare class SyncAtom<TValue> extends Atom<TValue> {
  value: ReadWriteSync<TValue> | ReadSync<TValue>;
}

export declare class AsyncAtom<TValue> extends Atom<TValue> {
  value: ReadWriteSync<TValue> | ReadSync<TValue>;
}

export default Atom;
