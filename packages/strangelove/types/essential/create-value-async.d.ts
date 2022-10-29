import ReadWriteValueAsync from './read-write-value-async';
import ReadValueAsync from './read-value-async';

type SelectClass<TValue, TConfig> = TConfig extends {set: Function}
  ? ReadWriteValueAsync<TValue>
  : ReadValueAsync<TValue>;

export default function createValueAsync<TData, Config>(
  config: Config
): SelectClass<TData, Config>;
