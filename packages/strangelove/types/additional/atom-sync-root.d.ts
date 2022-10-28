import {AtomSync} from '../essential/atom';
import Root from '../essential/root';

export type Listener<TValue> = (atom: AtomSyncRoot<TValue>) => void;

export default class AtomSyncRoot<TValue> extends AtomSync<TValue> {
  root: Root;
  get(): TValue;
  set(value: TValue): false | any;
  subscribe(cb: Listener<TValue>): () => void;
  unsubscribe(cb: Listener<TValue>);
}
