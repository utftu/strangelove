import {Relations} from '../relations/relations.js';
import {Listeners} from '../listeners/listeners.js';
import {alwaysYes} from '../consts/consts.js';
import {Value} from '../value/value.ts';
import {Root} from '../root/root.ts';

type Exec<TValue> = (atom: Atom<TValue>) => Promise<boolean> | boolean;
type Props<TValue> = {
  exec?: Exec<TValue>;
  root: Root;
  value?: TValue;
};

export function connectAtoms(parentAtom: Atom, childAtom: Atom) {
  parentAtom.relations.children.add(childAtom);
  childAtom.relations.parents.add(parentAtom);
}

export function disconnectAtoms(parentAtom: Atom, childAtom: Atom) {
  parentAtom.relations.children.delete(childAtom);
  childAtom.relations.parents.delete(parentAtom);
}

export class Atom<TValue = any> {
  static new<TValue>(props: Props<TValue>) {
    return new Atom(props);
  }

  static connect(parentAtom: Atom, childAtom: Atom) {
    connectAtoms(parentAtom, childAtom);
  }

  static disconnect(parentAtom: Atom, childAtom: Atom) {
    disconnectAtoms(parentAtom, childAtom);
  }

  transaction?: any;

  value: Value<TValue>;
  root: any;
  exec: Exec<TValue>;

  constructor({exec = alwaysYes, root, value}: Props<TValue>) {
    this.exec = exec;
    this.root = root;
    this.value = Value.new(value as TValue);
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

  set(value: TValue) {
    const needUpdate = this.value.set(value);
    if (!needUpdate) {
      return false;
    }
    const update = this.update();
    return update;
  }
}
