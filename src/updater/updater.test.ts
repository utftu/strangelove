import {describe, it, vi, expect} from 'vitest';
import {Atom} from '../atom/atom.ts';

describe('syncUpdater', () => {
  it('chain', () => {
    const atom3Exec = vi.fn();
    const atom1 = new Atom();
    const atom2 = new Atom();
    const atom3 = new Atom({
      exec: atom3Exec,
    });

    Atom.connect(atom1, atom2);
    Atom.connect(atom2, atom3);

    expect(atom3Exec.mock.calls.length).toBe(0);
    atom1.update();

    expect(atom3Exec.mock.calls.length).toBe(1);
  });
  it('several', () => {
    const child1Exec = vi.fn();
    const child2Exec = vi.fn();
    const parent = new Atom();
    const child1 = new Atom({
      exec: child1Exec,
    });
    const child2 = new Atom({
      exec: child2Exec,
    });

    Atom.connect(parent, child1);
    Atom.connect(parent, child2);

    parent.update();

    expect(child1Exec.mock.calls.length).toBe(1);
    expect(child2Exec.mock.calls.length).toBe(1);
  });
});
