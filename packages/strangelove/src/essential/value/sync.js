export class Sync {}

const defaultInitValue = {};

export class ReadSync extends Sync {
  constructor({get, set, value, needCheckPrev = false} = {}) {
    super();
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

export class ReadWriteSync extends ReadSync {
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

export function createSyncStore({get, set, value, needCheckPrev}) {
  if (set) {
    return new ReadWriteSync({
      get,
      set,
      value,
      needCheckPrev,
    });
  } else {
    return new ReadSync({
      get,
      value,
      needCheckPrev,
    });
  }
}
