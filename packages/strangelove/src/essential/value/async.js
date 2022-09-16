export class Async {}

export class ReadAsync extends Async {
  constructor(control, {needCheckPrev = false, value} = {}) {
    super();
    this.control = control;
    this.needCheckPrev = needCheckPrev;

    if (value) {
      this.setCache(value);
    }
  }
  async updateValue() {
    const getValue = this.control.get();
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
    return (this.asyncValue = newValue
      .then((newValue) => {
        this.syncValue = newValue;
        return newValue;
      })
      .catch((error) => {
        this.syncValue = error;
        throw error;
      }));
  }
  setCache(newValue) {
    this.syncValue = newValue;
    this.asyncValue = Promise.resolve(newValue);
  }
}

export class ReadWriteAsync extends ReadAsync {
  constructor(control, needCheckPrev) {
    super(control, needCheckPrev);
  }
  async set(newValue) {
    if (this.needCheckPrev && this.syncValue === newValue) {
      return false;
    }
    this.setCache(newValue);
    this.setPromise = this.control.set(newValue);
    await this.setPromise;
    return true;
  }
}

export function createAsyncStore({get, set, value, needCheckPrev}) {
  if (set) {
    return new ReadWriteAsync(
      {
        get,
        set,
      },
      {
        initValue: value,
        needCheckPrev,
      }
    );
  } else {
    return new ReadAsync(
      {
        get,
      },
      {
        initValue: value,
        needCheckPrev,
      }
    );
  }
}
