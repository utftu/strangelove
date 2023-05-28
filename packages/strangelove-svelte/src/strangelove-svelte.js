import {connectAtoms, disconnectAtoms, Atom} from 'strangelove';

export function patchAtom(atom) {
  atom.svelte = {
    subscribe(cb) {
      const subscribeAtom = Atom.new({
        exec: () => {
          cb(atom.value.get());
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

export function addSvelteMyAtoms(myAtoms) {
  const oldOnAtomCreate = myAtoms.onAtomCreate;
  myAtoms.onAtomCreate = (atom) => {
    patchAtom(atom);
    return oldOnAtomCreate.call(myAtoms, atom);
  };
}

export const hello = 'world';

// sdsd 2323
