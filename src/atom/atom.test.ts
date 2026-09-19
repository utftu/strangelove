import {describe, it, expect, mock} from "bun:test";
import {
  Atom,
  createAtom,
  checkAtom,
  connectAtoms,
  disconnectAtoms,
  destroyAtom,
} from './atom.ts';

describe('atom', () => {
  it('creating', () => {
    const exec = () => true;
    const atom = new Atom({exec});
    expect(atom.exec).toBe(exec);
  });

  it('static connect()', () => {
    const parent = new Atom();
    const child = new Atom();

    connectAtoms(parent, child);

    expect(parent.relations.children.size).toBe(1);
    expect([...parent.relations.children][0]).toBe(child);

    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(parent);
  });
  it('static disconnect()', () => {
    const parent = new Atom();
    const child = new Atom();

    connectAtoms(parent, child);
    disconnectAtoms(parent, child);

    expect(parent.relations.children.size).toBe(0);
    expect(child.relations.parents.size).toBe(0);
  });
  it('checkAtom()', () => {
    expect(checkAtom(createAtom(1))).toBe(true);
    expect(checkAtom(new Atom())).toBe(true);
    expect(checkAtom(5)).toBe(false);
    expect(checkAtom(undefined)).toBe(false);
    expect(checkAtom({})).toBe(false);
  });
  it('destroy() отцепляет от родителей и детей', () => {
    const parent = new Atom();
    const middle = new Atom();
    const child = new Atom();

    connectAtoms(parent, middle);
    connectAtoms(middle, child);

    destroyAtom(middle);

    expect(parent.relations.children.size).toBe(0);
    expect(middle.relations.parents.size).toBe(0);
    expect(middle.relations.children.size).toBe(0);
    expect(child.relations.parents.size).toBe(0);
  });

  it('destroy() снимает слушателей', () => {
    const atom = createAtom(1);
    const listener = mock();
    atom.listeners.subscribe(listener);

    destroyAtom(atom);
    atom.set(2);

    expect(listener.mock.calls.length).toBe(0);
  });

  it('destroy() не задевает соседей', () => {
    const source = createAtom(1);
    const first = new Atom({exec: mock()});
    const second = new Atom({exec: mock()});

    connectAtoms(source, first);
    connectAtoms(source, second);

    destroyAtom(first);
    source.set(2);

    expect(source.relations.children.size).toBe(1);
    expect((first.exec as any).mock.calls.length).toBe(0);
    expect((second.exec as any).mock.calls.length).toBe(1);
  });

  it('set()', () => {
    const atom1 = new Atom({exec: mock()});
    const exec2 = mock();
    const atom2 = new Atom({exec: exec2});
    connectAtoms(atom1, atom2);

    atom1.set('1');
    expect(exec2.mock.calls.length).toBe(1);
  });
});
