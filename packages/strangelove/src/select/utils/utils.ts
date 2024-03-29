import {Atom} from '../../atom/atom.ts';

export function replaceParents(atom: Atom, newParents: Set<Atom>) {
  for (const oldParent of atom.relations.parents.values()) {
    Atom.disconnect(oldParent, atom);
  }

  for (const newParent of newParents.values()) {
    Atom.connect(newParent, atom);
  }
}
