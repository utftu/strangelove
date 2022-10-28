import ReadValueAsync, {ReadValueAsyncConfig} from './read-value-async';

export interface ReadWriteValueAsyncConfig<TValue>
  extends ReadValueAsyncConfig<TValue> {
  set(data: TValue): Promise<boolean>;
}

export default class ReadWriteValueAsync<TData> extends ReadValueAsync<TData> {
  constructor(config?: ReadWriteValueAsyncConfig<TData>);
  set(data: TData): Promise<boolean>;
}
