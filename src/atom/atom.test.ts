import {describe, it, expect, vi} from 'vitest';
import {Atom} from './atom.ts';

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

    Atom.connect(parent, child);

    expect(parent.relations.children.size).toBe(1);
    expect([...parent.relations.children][0]).toBe(child);

    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(parent);
  });
  it('static disconnect()', () => {
    const root: any = {};
    const parent = new Atom();
    const child = new Atom();

    Atom.connect(parent, child);
    Atom.disconnect(parent, child);

    expect(parent.relations.children.size).toBe(0);
    expect(child.relations.parents.size).toBe(0);
  });
  it('set()', () => {
    const atom1 = new Atom({exec: vi.fn()});
    const exec2 = vi.fn();
    const atom2 = new Atom({exec: exec2});
    atom1.connect(atom2);

    atom1.set('1');
    expect(exec2.mock.calls.length).toBe(1);
  });
});
