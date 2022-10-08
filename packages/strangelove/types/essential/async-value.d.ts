interface ReadConfig<TData> {
  get(): Promise<TData>;
  needCheckPrev: boolean;
  value: TData;
}

interface ReadWriteConfig<TValue> extends ReadConfig<TValue> {
  set(data: TValue): Promise<boolean>;
}

export class ReadAsync<TData> {
  constructor(config?: ReadConfig<TData>);
  value: Promise<TData>;
  get(): Promise<TData>;
  getSync(): TData | undefined;
  update(): Promise<void>;
  setCache(data: TData);
  setCacheAsync(data: Promise<TData>): Promise<void>;
}

export class ReadWriteAsync<TData> extends ReadAsync<TData> {
  constructor(config?: ReadWriteConfig<TData>);
  set(data: TData): Promise<boolean>;
}

type ConfigCreateFunc<TValue, TConfig> = TConfig extends {set: Function}
  ? ReadConfig<TValue>
  : ReadWriteConfig<TValue>;

export function createAsyncStore<TData, Config = any>(
  config: ConfigCreateFunc<TData, Config>
): ReadAsync<TData> | ReadWriteAsync<TData>;
