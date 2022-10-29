import Root from '../essential/root';
import AtomAsync, {AtomAsyncProps} from '../essential/atom-async';

export type Listener<TValue> = (atom: AtomAsyncRoot<TValue>) => void;

export interface AtomAsyncRootProps<TValue> extends AtomAsyncProps<TValue> {
  root: Root;
}

export default class AtomAsyncRoot<TValue> extends AtomAsync<TValue> {
  constructor(config: AtomAsyncRootProps<TValue>);
  root: Root;
  get(): Promise<TValue>;
  set(value: TValue): Promise<false | any>;
  subscribe(cb: Listener<TValue>): () => void;
  unsubscribe(cb: Listener<TValue>);
}
