export interface ReadValueAsyncConfig<TData> {
  get(): Promise<TData>;
  needCheckPrev: boolean;
  value: TData;
}

export default class ReadValueAsync<TData> {
  constructor(config?: ReadValueAsyncConfig<TData>);
  syncValue: TData;
  value: Promise<TData>;
  get(): Promise<TData>;
  getSync(): TData | undefined;
  update(): Promise<void>;
  setCache(data: TData);
  setCacheAsync(data: Promise<TData>): Promise<void>;
}
