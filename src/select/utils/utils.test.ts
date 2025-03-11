import {describe, it, expect, vi} from 'vitest';
import {Atom} from '../../atom/atom.ts';
import {replaceParents} from './utils.ts';

describe('utils', () => {
  it('replaceParents', () => {
    const root = vi.fn() as any;
    const child = new Atom();
    const oldParent = new Atom();
    const newParent = new Atom();

    Atom.connect(oldParent, child);
    replaceParents(child, new Set([newParent]));
    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(newParent);
  });
});
