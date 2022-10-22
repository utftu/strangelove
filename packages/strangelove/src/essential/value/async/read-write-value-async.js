import ReadValueAsync from './read-value-async.js';

class ReadWriteValueAsync extends ReadValueAsync {
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

export default ReadWriteValueAsync;
