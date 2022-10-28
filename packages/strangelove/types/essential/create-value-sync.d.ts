import ReadValueSync, {ReadValueSyncConfig} from './read-value-sync';
import ReadWriteValueSync, {
  ReadWriteValueSyncConfig,
} from './read-write-value-sync';

type SelectConfig<TValue, TConfig> = TConfig extends {set: Function}
  ? ReadWriteValueSyncConfig<TValue>
  : ReadValueSyncConfig<TValue>;

type SelectClass<TValue, TConfig> = TConfig extends {set: Function}
  ? ReadWriteValueSync<TValue>
  : ReadValueSync<TValue>;

export default function createValueSync<TValue, TConfig = any>(
  config: SelectConfig<TValue, TConfig>
): SelectClass<TValue, TConfig>;
