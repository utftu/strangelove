export class ReadValueAsync {
  constructor({get, set, needCheckPrev = true, value}) {
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

export default ReadValueAsync;
