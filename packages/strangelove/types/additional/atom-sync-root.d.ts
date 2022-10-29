import Root from '../essential/root';
import AtomSync, {AtomSyncProps} from '../essential/atom-sync';

export type Listener<TValue> = (atom: AtomSyncRoot<TValue>) => void;

export interface AtomAsyncRootProps<TValue> extends AtomSyncProps<TValue> {
  root: Root;
}

export default class AtomSyncRoot<TValue> extends AtomSync<TValue> {
  constructor(config: AtomAsyncRootProps<TValue>);
  root: Root;
  get(): TValue;
  set(value: TValue): false | any;
  subscribe(cb: Listener<TValue>): () => void;
  unsubscribe(cb: Listener<TValue>);
}
