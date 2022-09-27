interface ReadAsyncControl<TData> {
  get(): Promise<TData>;
}

interface Config<TData> {
  needCheckPrev: boolean;
  value: TData;
}

export class ReadAsync<TData> {
  constructor(control: ReadAsyncControl<TData>, config?: Config<TData>);
  value: Promise<TData>;
  get(): Promise<TData>;
  getSync(): TData | undefined;
  update(): Promise<void>;
  setCache(data: TData);
  setCacheAsync(data: Promise<TData>): Promise<void>;
}

interface ReadWriteAsyncControl<TData> extends ReadSyncControl<TData> {
  set(data: TData);
}

export class ReadWriteAsync<TData> extends ReadSync<TData> {
  constructor(control: ReadWriteAsyncControl<TData>, config?: Config<TData>);
  set(data: TData): Promise<boolean>;
}

export function createAsyncStore<TData>(
  constructor: ReadWriteAsyncControl<TData> & Config<TData>
): ReadAsync<TData> | ReadWriteAsync<TData>;
