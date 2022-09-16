export class Sync {}

const defaultInitValue = {};

export class ReadSync extends Sync {
  constructor(control, {needCheckPrev = false, value} = {}) {
    super();
    this.control = control;
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
    this.setCache(this.control.get());
    return this;
  }
  setCache(newValue) {
    this.value = newValue;
  }
}

export class ReadWriteSync extends ReadSync {
  constructor(control, config) {
    super(control, config);
  }
  set(newValue) {
    if (this.needCheckPrev && this.value === newValue) {
      return false;
    }
    this.control.set(newValue);
    this.value = newValue;
    return true;
  }
}

export function createSyncStore({get, set, value, needCheckPrev}) {
  if (set) {
    return new ReadWriteSync(
      {
        get,
        set,
      },
      {
        value,
        needCheckPrev,
      }
    );
  } else {
    return new ReadSync(
      {
        get,
      },
      {
        value,
        needCheckPrev,
      }
    );
  }
}
