class Relations {
  static connect(parentAtom, childAtom) {
    parentAtom.relations._addChild(childAtom);
    childAtom.relations._addParent(parentAtom);
  }

  static disconnect(parentAtom, childAtom) {
    parentAtom.relations._removeChild(childAtom);
    childAtom.relations._removeParent(parentAtom);
  }

  constructor(atom) {
    this.atom = atom;
  }

  parents = new Set();
  _addParent(parent) {
    this.parents.add(parent);
  }
  _removeParent(parent) {
    this.parents.delete(parent);
  }
  replaceParents(newParents) {
    for (const oldParent of this.parents.values()) {
      Relations.disconnect(oldParent, this.atom);
    }

    for (const newParent of newParents.values()) {
      Relations.connect(newParent, this.atom);
    }
  }

  children = new Set();
  _addChild(child) {
    this.children.add(child);
  }
  _removeChild(child) {
    this.children.delete(child);
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
