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

  constructor({value, onBeforeUpdate = alwaysYes, onUpdate} = {}) {
    this.listeners = new Listeners();
    if (onUpdate) {
      this.listeners.subscribe(onUpdate);
    }
    this.onBeforeUpdate = onBeforeUpdate;
    this.value = value;
    this.relations = new Relations(this);
  }
}

export default Atom;
export {Atom as Atom};
export class AtomSync extends Atom {}
export class AtomAsync extends Atom {}
