import {describe, it, expect, vi} from 'vitest';
import {Atom} from '../../atom/atom.ts';
import {replaceParents} from './utils.ts';

describe('utils', () => {
  it('replaceParents', () => {
    const root = vi.fn() as any;
    const child = Atom.new({
      root,
    });
    const oldParent = Atom.new({
      root,
    });
    const newParent = Atom.new({
      root,
    });

    Atom.connect(oldParent, child);
    replaceParents(child, new Set([newParent]));
    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(newParent);
  });
});
