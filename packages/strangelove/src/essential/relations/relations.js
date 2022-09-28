class Relations {
  static connect(parentAtom, childAtom) {
    parentAtom.relations.children.add(childAtom);
    childAtom.relations.parents.add(parentAtom);
  }

  static disconnect(parentAtom, childAtom) {
    parentAtom.relations.children.delete(childAtom);
    childAtom.relations.parents.delete(parentAtom);
  }

  constructor(atom) {
    this.atom = atom;
  }

  parents = new Set();
  children = new Set();

  replaceParents(newParents) {
    for (const oldParent of this.parents.values()) {
      Relations.disconnect(oldParent, this.atom);
    }

    for (const newParent of newParents.values()) {
      Relations.connect(newParent, this.atom);
    }
  }

  replaceChildren(newChildren) {
    for (const oldChild of this.children.values()) {
      Relations.disconnect(this.atom, oldChild);
    }

    for (const newChild of newChildren) {
      Relations.connect(this.atom, newChild);
    }
  }
}

export default Relations;
