import {describe, it, vi, expect} from 'vitest';
import {Root} from '../../root/root.ts';
import {SyncUpdater} from './sync.ts';
import {Atom, connectAtoms} from '../../atom/atom.ts';

describe('syncUpdater', () => {
  it('chain', () => {
    const root = Root.new({
      updater: SyncUpdater.new(),
    });
    const atom3Exec = vi.fn();
    const atom1 = Atom.new({root});
    const atom2 = Atom.new({root});
    const atom3 = Atom.new({
      root,
      exec: atom3Exec,
    });

    connectAtoms(atom1, atom2);
    connectAtoms(atom2, atom3);

    expect(atom3Exec.mock.calls.length).toBe(0);
    root.update(atom1);

    expect(atom3Exec.mock.calls.length).toBe(1);
  });
  it('several', () => {
    const root = Root.new({
      updater: SyncUpdater.new(),
    });
    const child1Exec = vi.fn();
    const child2Exec = vi.fn();
    const parent = Atom.new({root});
    const child1 = Atom.new({
      root,
      exec: child1Exec,
    });
    const child2 = Atom.new({
      root,
      exec: child2Exec,
    });

    connectAtoms(parent, child1);
    connectAtoms(parent, child2);

    root.update(parent);

    expect(child1Exec.mock.calls.length).toBe(1);
    expect(child2Exec.mock.calls.length).toBe(1);
  });
});
