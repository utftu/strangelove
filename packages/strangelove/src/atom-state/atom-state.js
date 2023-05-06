import {Atom} from '../atom/atom.js';
import {Value} from '../value/value.js';

export class AtomState extends Atom {
  static new(...args) {
    return new AtomState(...args);
  }

  constructor({value, ...baseProps}) {
    super(baseProps);
    this.value = Value.new(value);
  }

  get() {
    return this.value.get();
  }

  set(value) {
    const needUpdate = this.value.set(value);
    if (!needUpdate) {
      return false;
    }
    const update = this.update();
    return update;
  }
}
