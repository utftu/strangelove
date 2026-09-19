import {describe, it, expect, vi} from 'vitest';
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
    const root = vi.fn() as any;
    const exec = () => true;
    const atom = new Atom({exec});
    expect(atom.exec).toBe(exec);
  });

  it('static connect()', () => {
    const root: any = {};
    const parent = new Atom();
    const child = new Atom();

    connectAtoms(parent, child);

    expect(parent.relations.children.size).toBe(1);
    expect([...parent.relations.children][0]).toBe(child);

    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(parent);
  });
  it('static disconnect()', () => {
    const root: any = {};
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
    const listener = vi.fn();
    atom.listeners.subscribe(listener);

    destroyAtom(atom);
    atom.set(2);

    expect(listener.mock.calls.length).toBe(0);
  });

  it('destroy() не задевает соседей', () => {
    const source = createAtom(1);
    const first = new Atom({exec: vi.fn()});
    const second = new Atom({exec: vi.fn()});

    connectAtoms(source, first);
    connectAtoms(source, second);

    destroyAtom(first);
    source.set(2);

    expect(source.relations.children.size).toBe(1);
    expect((first.exec as any).mock.calls.length).toBe(0);
    expect((second.exec as any).mock.calls.length).toBe(1);
  });

  it('set()', () => {
    const atom1 = new Atom({exec: vi.fn()});
    const exec2 = vi.fn();
    const atom2 = new Atom({exec: exec2});
    connectAtoms(atom1, atom2);

    atom1.set('1');
    expect(exec2.mock.calls.length).toBe(1);
  });
});
