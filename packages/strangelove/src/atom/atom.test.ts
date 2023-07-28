import {describe, it, expect, vi} from 'vitest';
import {Atom, connectAtoms, disconnectAtoms} from './atom.ts';

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
});
