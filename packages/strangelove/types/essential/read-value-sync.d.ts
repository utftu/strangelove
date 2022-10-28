export interface ReadValueSyncConfig<TData> {
  get(): TData;
  needCheckPrev: boolean;
  value: TData;
}

export default class ReadValueSync<TValue> {
  constructor(config?: ReadValueSyncConfig<TValue>);
  value: TValue;
  get(): TValue;
  update();
  setCache(data: TValue);
}
