import {describe, it, expect} from 'vitest';
import {Atom} from './atom.js';

describe('atom', () => {
  it('creating', () => {
    const root = {};
    const exec = () => {};
    const atom = Atom.new({exec, root});
    expect(atom.exec).toBe(exec);
    expect(atom.root).toBe(root);
  });

  it('static connect()', () => {
    const parent = Atom.new();
    const child = Atom.new();

    Atom.connect(parent, child);

    expect(parent.relations.children.size).toBe(1);
    expect([...parent.relations.children][0]).toBe(child);

    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(parent);
  });
  it('static disconnect()', () => {
    const parent = Atom.new();
    const child = Atom.new();

    Atom.connect(parent, child);
    Atom.disconnect(parent, child);

    expect(parent.relations.children.size).toBe(0);
    expect(child.relations.parents.size).toBe(0);
  });
});
