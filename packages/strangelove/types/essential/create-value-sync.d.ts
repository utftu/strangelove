import ReadValueSync from './read-value-sync';
import ReadWriteValueSync from './read-write-value-sync';

type SelectClass<TValue, TConfig> = TConfig extends {set: Function}
  ? ReadWriteValueSync<TValue>
  : ReadValueSync<TValue>;

export default function createValueSync<TValue, TConfig>(
  config: TConfig
): SelectClass<TValue, TConfig>;
