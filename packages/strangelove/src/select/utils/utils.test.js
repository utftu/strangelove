import {describe, it, expect} from 'vitest';
import {Atom} from '../../atom/atom.js';
import {replaceParents} from '../utils.js';

describe('utils', () => {
  it('replaceParents', () => {
    const child = Atom.new();
    const oldParent = Atom.new();
    const newParent = Atom.new();

    Atom.connect(oldParent, child);
    replaceParents(child, new Set([newParent]));
    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(newParent);
  });
});
