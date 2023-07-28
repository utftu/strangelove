type Config = {
  checkPrev?: boolean;
};

export class Value<TValue> {
  static new<TValue>(value: TValue, config?: Config) {
    return new Value<TValue>(value, config);
  }
  value: TValue;
  checkPrev: boolean = true;
  constructor(value: TValue, config: Config = {checkPrev: true}) {
    this.value = value;

    this.checkPrev = config.checkPrev ?? this.checkPrev;
  }
  setData(value: TValue) {
    this.value = value;
  }
  get() {
    return this.value;
  }
  set(value: TValue) {
    if (this.checkPrev && this.value === value) {
      return false;
    }
    this.setData(value);
    return true;
  }
}
