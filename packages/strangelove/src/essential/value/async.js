export class Async {}

export class ReadAsync extends Async {
  constructor({get, set, needCheckPrev = true, value}) {
    super();
    this.externalGet = get;
    this.externalSet = set;
    this.needCheckPrev = needCheckPrev;

    if (value) {
      this.setCache(value);
    }
  }
  async updateValue() {
    const getValue = this.externalGet();
    return this.setCacheAsync(getValue);
  }
  setPromise;

  asyncValue;
  syncValue;

  getSync() {
    return this.syncValue;
  }
  async get() {
    if (!this.asyncValue) {
      await this.updateValue();
    }
    return this.asyncValue;
  }
  async update() {
    if (this.setPromise) {
      await this.setPromise;
    }

    await this.updateValue();
    return this;
  }
  async setCacheAsync(newValue) {
    try {
      this.syncValue = await newValue;
      this.asyncValue = newValue;
    } catch (error) {
      this.syncValue = error;
      this.asyncValue = newValue;
    }
  }
  setCache(newValue) {
    this.syncValue = newValue;
    this.asyncValue = Promise.resolve(newValue);
  }
}

export class ReadWriteAsync extends ReadAsync {
  constructor(config) {
    super(config);
  }
  async set(newValue) {
    if (this.needCheckPrev && this.syncValue === newValue) {
      return false;
    }
    this.setCache(newValue);
    this.setPromise = this.externalSet(newValue);
    await this.setPromise;
    return true;
  }
}

export function createAsyncStore({get, set, value, needCheckPrev}) {
  if (set) {
    return new ReadWriteAsync({
      get,
      set,
      initValue: value,
      needCheckPrev,
    });
  } else {
    return new ReadAsync({
      get,
      initValue: value,
      needCheckPrev,
    });
  }
}
