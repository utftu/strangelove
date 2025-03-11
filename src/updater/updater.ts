import { Atom } from "../atom/atom.ts";

export const updateAtoms = (atom: Atom) => {
  const atomsToUpdate = [atom];

  while (atomsToUpdate.length > 0) {
    const atom = atomsToUpdate.pop()!;

    if (atom.exec(atom) === false) {
      return;
    }

    atom.listeners.trigger(atom);

    atom.relations.children.forEach((childAtom) => {
      atomsToUpdate.push(childAtom);
    });
  }
};
