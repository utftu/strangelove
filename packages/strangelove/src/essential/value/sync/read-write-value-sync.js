import ReadValueSync from './read-value-sync.js';

class ReadWriteValueSync extends ReadValueSync {
  constructor(config) {
    super(config);
  }
  set(newValue) {
    if (this.needCheckPrev && this.value === newValue) {
      return false;
    }
    this.externalSet(newValue);
    this.value = newValue;
    return true;
  }
}

export default ReadWriteValueSync;
