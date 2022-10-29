import {describe, it, jest, expect} from '@jest/globals';
import waitTime from 'utftu/wait-time.js';
import Atom, {AtomSync} from '../../atom/atom.js';
import Root from '../../root/root.js';
import SyncUpdater from './sync.js';

describe('syncUpdater', () => {
  it('chain', async () => {
    const root = new Root({
      updater: new SyncUpdater(),
    });
    const atom1OnUpdate = jest.fn();
    const atom1 = new AtomSync();
    const atom2 = new AtomSync();
    const atom3 = new AtomSync({
      onUpdate: atom1OnUpdate,
    });

    Atom.connect(atom1, atom2);
    Atom.connect(atom2, atom3);

    expect(atom1OnUpdate.mock.calls.length).toBe(0);
    root.update(atom1);

    await waitTime();
    expect(atom1OnUpdate.mock.calls.length).toBe(1);
  });
  it('several', async () => {
    const root = new Root({
      updater: new SyncUpdater(),
    });
    const child1Listener = jest.fn();
    const child2Listener = jest.fn();
    const parent = new AtomSync();
    const child1 = new AtomSync({
      onUpdate: child1Listener,
    });
    const child2 = new AtomSync({
      onUpdate: child2Listener,
    });

    Atom.connect(parent, child1);
    Atom.connect(parent, child2);

    root.update(parent);

    await waitTime();
    expect(child1Listener.mock.calls.length).toBe(1);
    expect(child2Listener.mock.calls.length).toBe(1);
  });
});
