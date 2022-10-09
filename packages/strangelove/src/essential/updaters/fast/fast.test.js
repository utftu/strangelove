import {describe, it, expect, jest} from '@jest/globals';
import Fast from './fast.js';
import Atom, {AtomAsync, AtomSync} from '../../atom/atom.js';
import waitTime from "utftu/wait-time.js";
import {
  createStoreAsync,
  ReadAsync,
  ReadWriteAsync,
} from '../../value/async.js';
import Root from '../../root/root.js';

describe('updaters/fast', () => {
  it('one child', async () => {
    const parentOnUpdate = jest.fn();
    const childOnUpdate = jest.fn();
    const parent = new AtomSync({
      onUpdate: parentOnUpdate,
    });
    const child = new AtomSync({
      onUpdate: childOnUpdate,
    });
    Atom.connect(parent, child);
    const fast = new Fast();
    fast.update(parent);
    await waitTime();
    expect(parentOnUpdate.mock.calls.length).toBe(1);
    expect(childOnUpdate.mock.calls.length).toBe(1);
  });
  it('wait set update', async () => {
    const initValue = 'init';
    const afterValue = 'after';
    const atom = new AtomAsync({
      value: new ReadWriteAsync({
        value: initValue,
        async get() {
          return this.value;
        },
        async set(newValue) {
          waitTime(10);
          this.value = newValue;
        },
      }),
    });
    atom.value.set(afterValue);
    const root = new Root();
    await root.update(atom);
    expect(atom.value.syncValue).toBe(afterValue);
  });
  it('throw first update', async () => {
    let atom2Calls = 0;
    const onUpdateAtom3 = jest.fn();
    const atom1 = new AtomAsync();
    const atom2 = new AtomAsync({
      value: new ReadAsync({
        async get() {
          if (atom2Calls === 0) {
            atom2Calls++;
            await waitTime(40);
          }
        },
      }),
    });
    const atom3 = new AtomAsync({
      onUpdate: onUpdateAtom3,
    });
    Atom.connect(atom1, atom2);
    Atom.connect(atom2, atom3);

    const root = new Root();
    root.update(atom1);
    await waitTime(10);
    root.update(atom1);
    await waitTime(50);
    expect(onUpdateAtom3.mock.calls.length).toBe(1);
  });
  it('sync discard', async () => {
    let runCount = 0;
    let updateCount = 0;
    const root = new Root();

    const parent1 = new AtomAsync({
      value: createStoreAsync({
        async get() {
          await waitTime(50);
        },
      }),
    });
    const parent2 = new AtomAsync({
      value: createStoreAsync({
        async get() {},
      }),
    });
    const child = new AtomSync({
      onUpdate: () => updateCount++,
    });
    Atom.connect(parent1, child);
    Atom.connect(parent2, child);
    expect(runCount).toBe(0);

    const update1 = root.update(parent1);
    await waitTime(10);
    const update2 = root.update(parent2);
    await Promise.all([update1, update2]);
    expect(updateCount).toBe(1);
  });
  it('async discard', async () => {
    let updateCount = 0;
    const root = new Root();

    const parent1 = new AtomAsync({
      value: createStoreAsync({
        async get() {
          await waitTime(50);
        },
      }),
    });
    const parent2 = new AtomAsync({
      value: createStoreAsync({
        async get() {},
      }),
    });
    const child = new AtomAsync({
      onUpdate: () => updateCount++,
    });
    Atom.connect(parent1, child);
    Atom.connect(parent2, child);
    expect(updateCount).toBe(0);

    const update1 = root.update(parent1);
    await waitTime(10);
    const update2 = root.update(parent2);
    await Promise.all([update1, update2]);
    expect(updateCount).toBe(1);
  });
  it('async after onBeforeUpdate() discard', async () => {
    let updateCount = 0;
    let runCount = 0;
    const root = new Root();

    const parent1 = new AtomAsync({
      value: createStoreAsync({
        async get() {},
      }),
    });
    const parent2 = new AtomAsync({
      value: createStoreAsync({
        async get() {},
      }),
    });
    const child = new AtomAsync({
      onUpdate: () => updateCount++,
      onBeforeUpdate: async () => {
        if (runCount === 0) {
          runCount++;
          await waitTime(30);
          return true;
        }
        return true;
      },
    });
    Atom.connect(parent1, child);
    Atom.connect(parent2, child);
    expect(updateCount).toBe(0);

    const update1 = root.update(parent1);
    await waitTime(10);
    const update2 = root.update(parent2);
    await Promise.all([update1, update2]);
    expect(updateCount).toBe(1);
  });
  it('sync discard onBeforeUpdate()', async () => {
    const root = new Root();
    const onUpdate = jest.fn();
    const atom = new AtomSync({
      onBeforeUpdate: () => false,
      onUpdate,
    });
    await root.update(atom);
    await waitTime(10);
    expect(onUpdate.mock.calls.length).toBe(0);
  });
  it('async discard onBeforeUpdate()', async () => {
    const root = new Root();
    const onUpdate = jest.fn();
    const atom = new AtomAsync({
      onBeforeUpdate: async () => false,
      onUpdate,
    });
    await root.update(atom);
    await waitTime(10);
    expect(onUpdate.mock.calls.length).toBe(0);
  });
});
