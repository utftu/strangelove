import ReadWriteValueAsync, {
  ReadWriteValueAsyncConfig,
} from './read-write-value-async';
import ReadValueAsync, {ReadValueAsyncConfig} from './read-value-async';

type SelectConfig<TValue, TConfig> = TConfig extends {set: Function}
  ? ReadWriteValueAsyncConfig<TValue>
  : ReadValueAsyncConfig<TValue>;

type SelectClass<TValue, TConfig> = TConfig extends {set: Function}
  ? ReadWriteValueAsync<TValue>
  : ReadValueAsync<TValue>;

export default function createValueAsync<TData, Config = any>(
  config: SelectConfig<TData, Config>
): SelectClass<TData, Config>;
