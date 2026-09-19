import { Relations } from "../relations/relations.ts";
import { Listeners } from "../listeners/listeners.ts";
import { alwaysYes } from "../consts/consts.ts";
import { Value } from "../value/value.ts";
import { updateAtoms } from "../updater/updater.ts";

type Exec<TValue> = (atom: Atom<TValue>) => boolean;

const magicKey = "_strnglv";

export type Props<TValue> = {
  exec?: Exec<TValue>;
  value?: TValue;
};

export function connectAtoms(parentAtom: Atom, childAtom: Atom): void {
  parentAtom.relations.children.add(childAtom);
  childAtom.relations.parents.add(parentAtom);
}

export function disconnectAtoms(parentAtom: Atom, childAtom: Atom): void {
  parentAtom.relations.children.delete(childAtom);
  childAtom.relations.parents.delete(parentAtom);
}

export function destroyAtom(atom: Atom): void {
  for (const parentAtom of atom.relations.parents) {
    disconnectAtoms(parentAtom, atom);
  }

  for (const childAtom of atom.relations.children) {
    disconnectAtoms(atom, childAtom);
  }

  atom.listeners.clear();
}

export const checkAtom = (mayAtom: unknown): mayAtom is Atom => {
  if (
    mayAtom &&
    typeof mayAtom === "object" &&
    magicKey in mayAtom &&
    mayAtom[magicKey] === magicKey
  ) {
    return true;
  }
  return false;
};

export class Atom<TValue = any> {
  value: Value<TValue>;
  exec: Exec<TValue>;

  constructor({ exec = alwaysYes, value }: Props<TValue> = {}) {
    this.exec = exec;
    this.value = new Value(value as TValue);

    // @ts-ignore
    this[magicKey] = magicKey;
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
}

export const createAtom = <TValue = any>(value: TValue) => new Atom({ value });
