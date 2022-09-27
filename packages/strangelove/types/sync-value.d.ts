interface ReadSyncControl<TData> {
  get(): TData;
}

interface Config<TData> {
  needCheckPrev: boolean;
  value: TData;
}

declare class ReadSync<TData> {
  constructor(control: ReadSyncControl<TData>, config?: Config<TData>);
  value: TData;
  get(): TData;
  update();
  setCache(data: TData);
}

interface ReadWriteSyncControl<TData> extends ReadSyncControl<TData> {
  set(data: TData);
}

declare class ReadWriteSync<TData> extends ReadSync<TData> {
  constructor(control: ReadWriteSyncControl<TData>, config?: Config<TData>);
  set(data: TData): boolean;
}

declare function createSyncStore<TData>(
  constructor: ReadWriteSyncControl<TData> & Config<TData>
): ReadSync<TData> | ReadWriteSync<TData>;
