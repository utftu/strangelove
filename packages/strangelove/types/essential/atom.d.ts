import Listeners from './listeners';
import Relations from './relations';
import ReadValueAsync from './read-value-async';
import ReadWriteValueAsync from './read-write-value-async';
import ReadWriteValueSync from './read-write-value-sync';
import ReadValueSync from './read-value-sync';

type AtomValues<TValue> =
  | ReadValueSync<TValue>
  | ReadWriteValueSync<TValue>
  | ReadValueAsync<TValue>
  | ReadWriteValueAsync<TValue>;

export interface AtomProps<TValue, TValueStore extends AtomValues<TValue>> {
  value: TValueStore;
  onBeforeUpdate: () => boolean;
  onUpdate: () => void;
}

export class Atom<TValue = any> {
  connect(parent: Atom, child: Atom);
  disconnect(parent: Atom, child: Atom);
  constructor(config: AtomProps<TValue, AtomValues<TValue>>);

  value: AtomValues<TValue>;
  listeners: Listeners<TValue>;
  relations: Relations;
}

export default Atom;
