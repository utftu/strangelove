import ReadValueSync, {ReadValueSyncConfig} from './read-value-sync';

export interface ReadWriteValueSyncConfig<TValue>
  extends ReadValueSyncConfig<TValue> {
  set(data: TValue): boolean;
}

export default class ReadWriteValueSync<TData> extends ReadValueSync<TData> {
  constructor(config?: ReadWriteValueSyncConfig<TData>);
  set(data: TData): boolean;
}
