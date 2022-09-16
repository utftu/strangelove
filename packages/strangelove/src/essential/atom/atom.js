import Relations from '../relations/relations.js';
import {alwaysYes} from '../consts/consts.js';
import Listeners from '../listeners/listeners.js';

class Atom {
  static connect(parentAtom, childAtom) {
    return Relations.connect(parentAtom, childAtom);
  }

  static disconnect(parentAtom, childAtom) {
    return Relations.disconnect(parentAtom, childAtom);
  }

  constructor({value, onBeforeUpdate = alwaysYes, onUpdate, name} = {}) {
    this.listeners = new Listeners();
    if (onUpdate) {
      this.listeners.subscribe(onUpdate);
    }
    this.onBeforeUpdate = onBeforeUpdate;
    this.value = value;
    this.relations = new Relations(this);
    this.name = name;
  }
}

export default Atom;
export {Atom as Atom};
export class SyncAtom extends Atom {}
export class AsyncAtom extends Atom {}
