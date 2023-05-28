import {createSignal, onCleanup, createEffect} from 'solid-js';
import {connectAtoms, disconnectAtoms, Atom} from 'strangelove';

export function patchAtom(atom) {
  const [state, setState] = createSignal(atom.get(), {equals: false});

  const connectedAtom = Atom.new({
    exec: () => {
      setState(atom.get());
    },
  });
  connectAtoms(atom, connectedAtom);

  onCleanup(() => disconnectAtoms(atom, connectedAtom));

  atom.solid = {
    state,
    get: () => {
      return state();
    },
    set(value) {
      return atom.set(value);
    },
  };
}

export function addSolidMyAtoms(myAtoms) {
  const oldOnAtomCreate = myAtoms.onAtomCreate;
  myAtoms.onAtomCreate = (atom) => {
    patchAtom(atom);
    return oldOnAtomCreate.call(myAtoms, atom);
  };
}
