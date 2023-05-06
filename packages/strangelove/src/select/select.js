import {selectSyncInners} from './sync/select-sync-inners.js';
import {selectAsyncInners} from './async/select-async-inners.js';
import {Atom} from '../atom/atom.js';
import {runCb} from './run-cb/run-cb.js';
import {Value} from '../value/value.js';

export class Select extends Atom {
  static new(...args) {
    return new Select(...args);
  }

  constructor({value, ...baseProps}) {
    super(baseProps);
    this.value = Value.new(value);
  }

  get() {
    return this.value.value;
  }
}

export function select(cb, {root}) {
  const {value, parents} = runCb(cb);

  if (value instanceof Promise) {
    return selectAsyncInners({
      cb,
      value,
      parents,
      root,
    });
  } else {
    return selectSyncInners({
      cb,
      value,
      parents,
      root,
    });
  }
}
