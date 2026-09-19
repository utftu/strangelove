import {Atom, connectAtoms, disconnectAtoms} from '../../atom/atom.ts';

export function replaceParents(atom: Atom, newParents: Set<Atom>) {
  for (const oldParent of atom.relations.parents.values()) {
    disconnectAtoms(oldParent, atom);
  }

  for (const newParent of newParents.values()) {
    connectAtoms(newParent, atom);
  }
}
