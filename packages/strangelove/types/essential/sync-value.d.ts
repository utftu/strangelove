interface ReadConfig<TData> {
  get(): TData;
  needCheckPrev: boolean;
  value: TData;
}

interface ReadWriteConfig<TValue> extends ReadConfig<TValue> {
  set(data: TValue): boolean;
}

export class ReadSync<TValue> {
  constructor(config?: ReadConfig<TValue>);
  value: TValue;
  get(): TValue;
  update();
  setCache(data: TValue);
}

export class ReadWriteSync<TData> extends ReadSync<TData> {
  constructor(config?: ReadWriteConfig<TData>);
  set(data: TData): boolean;
}

type ConfigCreateFunc<TValue, TConfig> = TConfig extends {set: Function}
  ? ReadConfig<TValue>
  : ReadWriteConfig<TValue>;

export function createAsyncStore<TValue, Config = any>(
  config: ConfigCreateFunc<TValue, Config>
): ConfigCreateFunc<TValue, Config>;
