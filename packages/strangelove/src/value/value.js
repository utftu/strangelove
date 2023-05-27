export class Value {
  static new(...args) {
    return new Value(...args);
  }
  constructor(value, {checkPrev = true} = {}) {
    this.value = value;
    this.checkPrev = checkPrev;
  }
  setData(value) {
    this.value = value;
  }
  get() {
    return this.value;
  }
  set(value) {
    if (this.checkPrev && this.value === value) {
      return false;
    }
    this.setData(value);
    return true;
  }
}
