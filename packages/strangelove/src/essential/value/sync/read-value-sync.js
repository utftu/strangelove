const defaultInitValue = {};

class ReadValueSync {
  constructor({get, set, value, needCheckPrev = true}) {
    this.externalGet = get;
    this.externalSet = set;
    this.needCheckPrev = needCheckPrev;
    this.value = value ?? defaultInitValue;
  }
  get() {
    if (this.value === defaultInitValue) {
      this.update();
    }
    return this.value;
  }
  update() {
    this.setCache(this.externalGet());
    return this;
  }
  setCache(newValue) {
    this.value = newValue;
  }
}

export default ReadValueSync;
