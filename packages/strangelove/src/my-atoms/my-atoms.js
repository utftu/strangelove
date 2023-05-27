// import {AtomState} from '../atom-state/atom-state.js';
import {Atom} from '../atom/atom.js';
import {select as selectBase} from '../select/select.js';
import {createDefaultRoot} from '../root/default-root.js';

export class MyAtoms {
  static new(...args) {
    return new MyAtoms(...args);
  }
  root = createDefaultRoot();
  onAtomCreate(atom) {
    return atom;
  }
  createAtom(value) {
    const atom = Atom.new({value, root: this.root});
    this.onAtomCreate(atom);
    return atom;
  }
  createSelect(cb) {
    return selectBase(cb, {
      root: this.root,
      onAtomCreate: (atom) => this.onAtomCreate(atom),
    });
  }
  constructor({plugins = []} = {}) {
    this.plugins = plugins;
    this.plugins.forEach((plugin) => plugin(this));
  }
}

let myAtoms;

export function getMyAtoms() {
  if (myAtoms === undefined) {
    myAtoms = MyAtoms.new();
  }
  return myAtoms;
}

export const atom = (value) => getMyAtoms().createAtom(value);
export const select = (cb) => getMyAtoms().createSelect(cb);
