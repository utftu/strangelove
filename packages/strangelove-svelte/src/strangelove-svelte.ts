import {connectAtoms, disconnectAtoms, Atom} from 'strangelove';
import {MyAtoms} from 'strangelove/src/my-atoms/my-atoms.ts';

type StoreWrite<TValue> = {
  subscribe: (subscription: (value: TValue) => void) => () => void;
  set: (value: TValue) => void;
};
type SvelteAtom<TValue> = Atom<TValue> & {svelte: StoreWrite<TValue>};

export function patchAtom<TValue>(atom: Atom<TValue>) {
  (atom as SvelteAtom<TValue>).svelte = {
    subscribe(cb) {
      const subscribeAtom = Atom.new({
        root: atom.root,
        exec: () => {
          cb(atom.value.get());
          return true;
        },
      });
      connectAtoms(atom, subscribeAtom);
      cb(atom.get());
      return () => disconnectAtoms(atom, subscribeAtom);
    },
    set(value) {
      atom.set(value);
    },
  };
}

export function addSvelteMyAtoms(myAtoms: MyAtoms) {
  const oldOnAtomCreate = myAtoms.onAtomCreate;
  myAtoms.onAtomCreate = (atom) => {
    patchAtom(atom);
    return oldOnAtomCreate.call(myAtoms, atom);
  };
}

// export const hello = 'world';

// sdsd 2323
