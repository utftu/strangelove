import {Atom} from '../../atom/atom.ts';

type Get<TValue = any> = (atom: Atom<TValue>) => TValue;
export type Cb = (get: Get) => any;

export function runCb<TValue>(cb: Cb) {
  const parents: Set<Atom> = new Set();

  const value: TValue = cb((atom) => {
    parents.add(atom);
    return atom.value.get();
  });

  return {
    cb,
    value,
    parents,
  };
}
