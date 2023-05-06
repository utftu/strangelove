export class Value {
  static new(...args) {
    return new Value(...args);
  }
  constructor(value, {checkPrev = true} = {}) {
    this.value = value;
    this.checkPrev = checkPrev;
  }
  get() {
    return this.value;
  }
  set(value) {
    if (this.checkPrev && this.value === value) {
      return false;
    }
    this.value = value;
    return true;
  }
}
