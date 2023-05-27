import {Relations} from '../relations/relations.js';
import {Listeners} from '../listeners/listeners.js';
import {alwaysYes} from '../consts/consts.js';
import {Value} from '../value/value.js';

export function connectAtoms(parentAtom, childAtom) {
  parentAtom.relations.children.add(childAtom);
  childAtom.relations.parents.add(parentAtom);
}

export function disconnectAtoms(parentAtom, childAtom) {
  parentAtom.relations.children.delete(childAtom);
  childAtom.relations.parents.delete(parentAtom);
}

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

  constructor({exec = alwaysYes, root, value} = {}) {
    this.exec = exec;
    this.root = root;
    this.value = Value.new(value);
    this.relations = Relations.new();
  }

  listeners = new Listeners();

  listenersSync = new Listeners();
  listenersAsync = new Listeners();
  relations = new Relations();

  update() {
    return this.root.update(this);
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
