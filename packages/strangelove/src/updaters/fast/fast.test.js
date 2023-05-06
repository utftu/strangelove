import {describe, it, expect, vi} from 'vitest';
import {FastUpdater} from './fast.js';
import {Atom} from '../../atom/atom.js';
import waitTime from 'utftu/wait-time.js';
import {createDefaultRoot} from '../../root/default-root.js';

describe('updaters/fast', () => {
  it('one child', async () => {
    const parentExec = vi.fn();
    const childExec = vi.fn();
    const parent = Atom.new({
      exec: parentExec,
    });
    const child = Atom.new({
      exec: childExec,
    });
    Atom.connect(parent, child);
    const fast = FastUpdater.new();
    fast.update(parent);
    await waitTime();
    expect(parentExec.mock.calls.length).toBe(1);
    expect(childExec.mock.calls.length).toBe(1);
  });
  it('throw first update', async () => {
    let atom2Calls = 0;
    const atom3Exec = vi.fn();
    const atom1 = Atom.new();
    const atom2 = Atom.new({
      async exec() {
        if (atom2Calls === 0) {
          atom2Calls++;
          await waitTime(40);
        }
      },
    });

    const atom3 = Atom.new({
      exec: atom3Exec,
    });
    Atom.connect(atom1, atom2);
    Atom.connect(atom2, atom3);

    const root = createDefaultRoot();
    root.update(atom1);
    await waitTime(10);
    root.update(atom1);
    await waitTime(50);
    expect(atom3Exec.mock.calls.length).toBe(1);
  });
  it('sync discard exec()', async () => {
    const root = createDefaultRoot();
    const onUpdate = vi.fn();
    const atom = new Atom({
      exec: () => false,
    });
    await root.update(atom);
    await waitTime(10);
    expect(onUpdate.mock.calls.length).toBe(0);
  });
  it('async discard exec()', async () => {
    const root = createDefaultRoot();
    const onUpdate = vi.fn();
    const atom = Atom.new({
      exec: async () => false,
    });
    await root.update(atom);
    await waitTime(10);
    expect(onUpdate.mock.calls.length).toBe(0);
  });
});
