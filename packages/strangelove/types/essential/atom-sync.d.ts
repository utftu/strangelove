import Atom, {AtomProps} from './atom';
import ReadValueSync from './read-value-sync';
import ReadWriteValueSync from './read-write-value-sync';

type ValueSync<TValue> = ReadValueSync<TValue> | ReadWriteValueSync<TValue>;

export interface AtomSyncProps<TValue>
  extends AtomProps<TValue, ValueSync<TValue>> {
  value: ValueSync<TValue>;
}

export default class AtomSync<TValue> extends Atom<TValue> {
  constructor(config: AtomSyncProps<TValue>);
  value: ValueSync<TValue>;
}
