import {describe, it, vi, expect} from 'vitest';
import {Root} from '../../root/root.js';
import {SyncUpdater} from './sync.js';
import {Atom} from '../../atom/atom.js';

describe('syncUpdater', () => {
  it('chain', () => {
    const root = Root.new({
      updater: SyncUpdater.new(),
    });
    const atom3Exec = vi.fn();
    const atom1 = Atom.new();
    const atom2 = Atom.new();
    const atom3 = Atom.new({
      exec: atom3Exec,
    });

    Atom.connect(atom1, atom2);
    Atom.connect(atom2, atom3);

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
    const parent = Atom.new();
    const child1 = Atom.new({
      exec: child1Exec,
    });
    const child2 = Atom.new({
      exec: child2Exec,
    });

    Atom.connect(parent, child1);
    Atom.connect(parent, child2);

    root.update(parent);

    expect(child1Exec.mock.calls.length).toBe(1);
    expect(child2Exec.mock.calls.length).toBe(1);
  });
});
