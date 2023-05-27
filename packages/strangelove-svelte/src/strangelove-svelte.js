import {connectAtoms, disconnectAtoms, Atom} from 'strangelove';

export function patchAtom(atom) {
  if (!atom.value) {
    return;
  }
  atom.svelte = {
    subscribe(cb) {
      const subscribeAtom = Atom.new({
        exec: () => cb(atom.value.get()),
      });
      connectAtoms(atom, subscribeAtom);
      return () => disconnectAtoms(atom, subscribeAtom);
    },
    set(value) {
      atom.value.set(value);
    },
  };
}

export function addSvelteMyAtoms(myAtoms) {
  const oldOnAtomCreate = myAtoms.onAtomCreate;
  myAtoms.onAtomCreate = (atom) => {
    patchAtom(atom);
    return oldOnAtomCreate.apply(myAtoms, atom);
  };
}
