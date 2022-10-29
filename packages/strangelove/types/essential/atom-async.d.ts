import Atom, {AtomProps} from './atom';
import ReadValueAsync from './read-value-async';
import ReadWriteValueAsync from './read-write-value-async';

type ValueAsync<TValue> = ReadValueAsync<TValue> | ReadWriteValueAsync<TValue>;

export interface AtomAsyncProps<TValue>
  extends AtomProps<TValue, ValueAsync<TValue>> {
  value: ValueAsync<TValue>;
}

export default class AtomAsync<TValue> extends Atom<TValue> {
  constructor(config: AtomAsyncProps<TValue>);
  value: ValueAsync<TValue>;
}
