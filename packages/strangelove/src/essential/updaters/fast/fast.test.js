import {describe, it, expect, jest} from '@jest/globals';
import Fast from './index.js';
import Atom, {AsyncAtom, SyncAtom} from '../../atom/atom.js';
import awaitTime from 'utftu/awaitTime';
import {AsyncRead, AsyncReadWrite} from '../../value/async.js';
import Root from '../../root/root.js';

describe('updaters/fast', () => {
  it('one child', async () => {
    const parentOnUpdate = jest.fn();
    const childOnUpdate = jest.fn();
    const parent = new SyncAtom({
      onUpdate: parentOnUpdate,
    });
    const child = new SyncAtom({
      onUpdate: childOnUpdate,
    });
    Atom.connect(parent, child);
    const fast = new Fast();
    fast.update(parent);
    await awaitTime();
    expect(parentOnUpdate.mock.calls.length).toBe(1);
    expect(childOnUpdate.mock.calls.length).toBe(1);
  });
  it('wait set update', async () => {
    const initValue = 'init';
    const afterValue = 'after';
    const atom = new AsyncAtom({
      value: new AsyncReadWrite({
        value: initValue,
        async get() {
          return this.value;
        },
        async set(newValue) {
          awaitTime(10);
          this.value = newValue;
        },
      }),
    });
    await atom.value.set(afterValue);
    const root = new Root();
    await root.update(atom);
    expect(atom.value.syncValue).toBe(afterValue);
  });
  it('throw first update', async () => {
    let atom2Calls = 0;
    const onUpdateAtom3 = jest.fn();
    const atom1 = new AsyncAtom({
      name: 'atom1',
    });
    const atom2 = new AsyncAtom({
      name: 'atom2',
      value: new AsyncRead({
        async get() {
          if (atom2Calls < 1) {
            atom2Calls++;
            await awaitTime(40);
          }
        },
      }),
    });
    const atom3 = new AsyncAtom({
      name: 'atom2',
      onUpdate: onUpdateAtom3,
    });
    Atom.connect(atom1, atom2);
    Atom.connect(atom2, atom3);
    atom1.name = 'atom1';
    atom2.name = 'atom2';
    atom3.name = 'atom3';

    const root = new Root();
    root.update(atom1);
    await awaitTime(1);
    root.update(atom1);
    await awaitTime(50);
    expect(onUpdateAtom3.mock.calls.length).toBe(1);
  });
});
