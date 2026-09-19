import {describe, it, expect, mock} from "bun:test";
import {Atom, connectAtoms} from '../../atom/atom.ts';
import {replaceParents} from './utils.ts';

describe('utils', () => {
  it('replaceParents', () => {
    const child = new Atom();
    const oldParent = new Atom();
    const newParent = new Atom();

    connectAtoms(oldParent, child);
    replaceParents(child, new Set([newParent]));
    expect(child.relations.parents.size).toBe(1);
    expect([...child.relations.parents][0]).toBe(newParent);
  });
});
