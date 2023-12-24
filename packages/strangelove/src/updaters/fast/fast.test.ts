import {describe, it, expect, vi} from 'vitest';
import {FastUpdater} from './fast.ts';
import {Atom} from '../../atom/atom.ts';
import {waitTime} from 'utftu';
import {createDefaultRoot} from '../../root/default-root.ts';

describe('updaters/fast', () => {
  it('one child 1', async () => {
    const root = vi.fn() as any;
    const parentExec = vi.fn();
    const childExec = vi.fn();
    const parent = Atom.new({
      exec: parentExec,
      root,
    });
    const child = Atom.new({
      exec: childExec,
      root,
    });
    Atom.connect(parent, child);
    const fast = FastUpdater.new();
    await fast.update(parent);
    expect(parentExec.mock.calls.length).toBe(1);
    expect(childExec.mock.calls.length).toBe(1);

    await fast.update(parent);
    expect(parentExec.mock.calls.length).toBe(2);
    expect(childExec.mock.calls.length).toBe(2);
  });
  it('one child', async () => {
    const root = vi.fn() as any;
    const parentExec = vi.fn();
    const childExec = vi.fn();
    const parent = Atom.new({
      exec: parentExec,
      root,
    });
    const child = Atom.new({
      exec: childExec,
      root,
    });
    Atom.connect(parent, child);
    const fast = FastUpdater.new();
    fast.update(parent);
    await waitTime();
    expect(parentExec.mock.calls.length).toBe(1);
    expect(childExec.mock.calls.length).toBe(1);
  });
  it('throw first update', async () => {
    const root = createDefaultRoot();
    let atom2Calls = 0;
    const atom3Exec = vi.fn();
    const atom1 = Atom.new({
      root,
    });
    const atom2 = Atom.new({
      root,
      async exec() {
        if (atom2Calls++ === 0) {
          await waitTime(40);
        }
        return true;
      },
    });

    const atom3 = Atom.new({
      exec: atom3Exec,
      root,
    });

    Atom.connect(atom1, atom2);
    Atom.connect(atom2, atom3);

    const update1 = root.update(atom1);
    await waitTime(5);
    const update2 = root.update(atom1);
    await Promise.all([update1, update2]);

    expect(atom3Exec.mock.calls.length).toBe(1);
  });
  it('sync discard exec()', async () => {
    const root = createDefaultRoot();
    const onUpdate = vi.fn();
    const atom = new Atom({
      root,
      exec: () => false,
    });
    root.update(atom);
    expect(onUpdate.mock.calls.length).toBe(0);
  });
  it('async discard exec()', async () => {
    const root = createDefaultRoot();
    const onUpdate = vi.fn();
    const atom = Atom.new({
      root,
      exec: async () => false,
    });
    const update = root.update(atom);
    await update.promise;
    expect(onUpdate.mock.calls.length).toBe(0);
  });
});
