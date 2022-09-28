import {describe, it, expect} from '@jest/globals';
import Relations from './relations.js';
import Atom from '../atom/atom.js';

describe('relations', () => {
  it('static connect()', () => {
    const parent = new Atom();
    const child = new Atom();

    Relations.connect(parent, child);

    expect(parent.relations.children.size).toBe(1);
    expect([...parent.relations.children][0]).toBe(child);

    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(parent);
  });
  it('static disconnect()', () => {
    const parent = new Atom();
    const child = new Atom();

    Relations.connect(parent, child);
    Relations.disconnect(parent, child);

    expect(parent.relations.children.size).toBe(0);
    expect(child.relations.parents.size).toBe(0);
  });
  it('replaceParents()', () => {
    const child = new Atom();
    const oldParent = new Atom();
    const newParent = new Atom();

    Relations.connect(oldParent, child);
    child.relations.replaceParents(new Set([newParent]));
    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(newParent);
  });
  it('replaceChildren()', () => {
    const parent = new Atom();
    const oldChild = new Atom();
    const newChild = new Atom();

    Relations.connect(parent, oldChild);
    parent.relations.replaceChildren(new Set([newChild]));
    expect(parent.relations.children.size).toBe(1);
    expect([...parent.relations.children][0]).toBe(newChild);
  });
});
