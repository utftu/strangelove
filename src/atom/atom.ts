import { Relations } from "../relations/relations.ts";
import { Listeners } from "../listeners/listeners.ts";
import { alwaysYes } from "../consts/consts.ts";
import { Value } from "../value/value.ts";
import { updateAtoms } from "../updater/updater.ts";

type Exec<TValue> = (atom: Atom<TValue>) => boolean;

const instanceValue = "strnglv";
const instanceKey = "_strnglv";

export type Props<TValue> = {
  exec?: Exec<TValue>;
  value?: TValue;
};

function connectAtoms(parentAtom: Atom, childAtom: Atom) {
  parentAtom.relations.children.add(childAtom);
  childAtom.relations.parents.add(parentAtom);
}

function disconnectAtoms(parentAtom: Atom, childAtom: Atom) {
  parentAtom.relations.children.delete(childAtom);
  childAtom.relations.parents.delete(parentAtom);
}

export class Atom<TValue = any> {
  static connect(parentAtom: Atom, childAtom: Atom) {
    connectAtoms(parentAtom, childAtom);
  }

  static disconnect(parentAtom: Atom, childAtom: Atom) {
    disconnectAtoms(parentAtom, childAtom);
  }

  value: Value<TValue>;
  exec: Exec<TValue>;

  constructor({ exec = alwaysYes, value }: Props<TValue> = {}) {
    this.exec = exec;
    this.value = new Value(value as TValue);
    this.relations = new Relations();

    // @ts-ignore
    this[instanceKey] = instanceValue;
  }

  listeners = new Listeners<TValue>();

  relations = new Relations();

  update() {
    updateAtoms(this);
  }

  get() {
    return this.value.get();
  }

  set(value: TValue) {
    const needUpdate = this.value.set(value);
    if (!needUpdate) {
      return false;
    }
    this.update();
    return true;
  }

  connect(childAtom: Atom) {
    connectAtoms(this, childAtom);
  }

  disconnect(childAtom: Atom) {
    disconnectAtoms(this, childAtom);
  }
}

export const checkAtom = (mayAtom: unknown): mayAtom is Atom => {
  if (
    mayAtom &&
    typeof mayAtom === "object" &&
    instanceKey in mayAtom &&
    mayAtom[instanceKey] === instanceValue
  ) {
    return true;
  }
  return false;
};

export const createAtom = <TValue = any>(value: TValue) => new Atom({ value });
