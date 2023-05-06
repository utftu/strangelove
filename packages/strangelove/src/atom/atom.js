import {Relations} from '../relations/relations.js';
import {Listeners} from '../listeners/listeners.js';
import {alwaysYes} from '../consts/consts.js';

export class Atom {
  static new(...args) {
    return new Atom(...args);
  }

  static connect(parentAtom, childAtom) {
    parentAtom.relations.children.add(childAtom);
    childAtom.relations.parents.add(parentAtom);
  }

  static disconnect(parentAtom, childAtom) {
    parentAtom.relations.children.delete(childAtom);
    childAtom.relations.parents.delete(parentAtom);
  }

  constructor({exec = alwaysYes, root} = {}) {
    this.exec = exec;
    this.root = root;
    this.relations = Relations.new();
  }

  update() {
    return this.root.update(this);
  }

  listeners = new Listeners();
  relations = new Relations();
}
