import { Atom } from "../../atom/atom.ts";

export type Get = <TValue = any>(atom: Atom<TValue>) => TValue;
export type Cb = (get: Get) => any;

export function runCb<TCb extends Cb = Cb>(cb: TCb) {
  const parents: Set<Atom> = new Set();

  const value = cb((atom) => {
    parents.add(atom);
    return atom.value.get();
  });

  return {
    cb,
    value,
    parents,
  };
}
