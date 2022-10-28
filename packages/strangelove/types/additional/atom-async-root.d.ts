import {AtomAsync} from '../essential/atom';
import Root from '../essential/root';

export type Listener<TValue> = (atom: AtomAsyncRoot<TValue>) => void;

export default class AtomAsyncRoot<TValue> extends AtomAsync<TValue> {
  root: Root;
  get(): Promise<TValue>;
  set(value: TValue): Promise<false | any>;
  subscribe(cb: Listener<TValue>): () => void;
  unsubscribe(cb: Listener<TValue>);
}
