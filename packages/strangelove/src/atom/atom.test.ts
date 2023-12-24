import {describe, it, expect, vi} from 'vitest';
import {Atom, connectAtoms, disconnectAtoms} from './atom.ts';
import {createDefaultRoot} from '../strangelove.ts';

describe('atom', () => {
  it('creating', () => {
    const root = vi.fn() as any;
    const exec = () => true;
    const atom = Atom.new({exec, root});
    expect(atom.exec).toBe(exec);
    expect(atom.root).toBe(root);
  });

  it('static connect()', () => {
    const root: any = {};
    const parent = Atom.new({root});
    const child = Atom.new({root});

    connectAtoms(parent, child);

    expect(parent.relations.children.size).toBe(1);
    expect([...parent.relations.children][0]).toBe(child);

    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(parent);
  });
  it('static disconnect()', () => {
    const root: any = {};
    const parent = Atom.new({root});
    const child = Atom.new({root});

    connectAtoms(parent, child);
    disconnectAtoms(parent, child);

    expect(parent.relations.children.size).toBe(0);
    expect(child.relations.parents.size).toBe(0);
  });
  it('set()', () => {
    const root = createDefaultRoot();
    const atom1 = Atom.new({exec: vi.fn(), root});
    const exec2 = vi.fn();
    const atom2 = Atom.new({exec: exec2, root});
    connectAtoms(atom1, atom2);

    atom1.set('1');
    expect(exec2.mock.calls.length).toBe(1);
  });
});
