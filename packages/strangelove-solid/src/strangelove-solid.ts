import {Accessor, createSignal, onCleanup} from 'solid-js';
import {connectAtoms, disconnectAtoms, Atom} from 'strangelove';
import {MyAtoms} from 'strangelove/src/my-atoms/my-atoms.ts';

type Store<TValue> = {
  state: Accessor<TValue>;
  get: () => TValue;
  set: (value: TValue) => boolean;
};

type AtomSolid<TValue> = Atom<TValue> & {
  solid: Store<TValue>;
};

export function patchAtom<TValue>(atom: Atom<TValue>) {
  const [state, setState] = createSignal(atom.get(), {equals: false});

  const connectedAtom = Atom.new({
    root: atom.root,
    exec: () => {
      setState(() => atom.get());
      return true;
    },
  });
  connectAtoms(atom, connectedAtom);

  onCleanup(() => disconnectAtoms(atom, connectedAtom));

  (atom as AtomSolid<TValue>).solid = {
    state,
    get: () => {
      return state();
    },
    set(value) {
      return atom.set(value);
    },
  };
}

export function addSolidMyAtoms(myAtoms: MyAtoms) {
  const oldOnAtomCreate = myAtoms.onAtomCreate;
  myAtoms.onAtomCreate = (atom) => {
    patchAtom(atom);
    return oldOnAtomCreate.call(myAtoms, atom);
  };
}
