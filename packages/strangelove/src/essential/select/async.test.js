import {describe, it, expect, jest} from '@jest/globals';
import {AtomAsync, AtomSync} from '../atom/atom.js';
import runCb from './run-cb.js';
import Root from '../root/root.js';
import selectAsync from './async.js';
import {createStoreAsync, ReadWriteAsync} from '../value/async.js';
import awaitTime from 'utftu/awaitTime';
import {createStoreSync} from '../value/sync.js';
import selectSync from './sync.js';

function createReadWriteAsync(value) {
  return new ReadWriteAsync({
    value,
    async get() {
      return this.value;
    },
    async set(value) {
      this.value = value;
    },
  });
}

const createAsyncAtom = (config) => new AtomAsync(config);

describe('async', () => {
  it('async get', async () => {
    const parent1Value = 'parent1 value';
    const newParent1Value = 'new parent1 value';
    const parent2Value = 'parent2 value';

    const parent1 = new AtomSync({value: createReadWriteAsync(parent1Value)});
    const parent2 = new AtomSync({value: createReadWriteAsync(parent2Value)});

    const calls = jest.fn();
    const selectorAtom = await selectAsync({
      ...runCb(async (get) => {
        const parent1Value = await get(parent1);
        const parent2Value = await get(parent2);
        calls(parent1Value + parent2Value);
      }),
      createAtom: createAsyncAtom,
    });
    expect(selectorAtom.relations.parents.size).toBe(2);
    expect(parent1.relations.children.size).toBe(1);
    expect(parent2.relations.children.size).toBe(1);

    expect(calls.mock.calls.length).toBe(1);
    expect(calls.mock.calls[0][0]).toBe(parent1Value + parent2Value);

    const root = new Root();

    parent1.value.set(newParent1Value);
    await root.update(parent1);

    expect(calls.mock.calls.length).toBe(2);
    expect(calls.mock.calls[1][0]).toBe(newParent1Value + parent2Value);
  });
  it('discard old updates', async () => {
    const parent1 = new AtomSync({value: createReadWriteAsync('paren1')});
    const parent2 = new AtomSync({value: createReadWriteAsync('parent1')});
    let updateCount = 0;
    const atom = await selectAsync({
      ...runCb(async (get) => {
        if (updateCount === 1) {
          updateCount++;
          get(parent1);
          await awaitTime(100);
          return 'one';
        } else if (updateCount === 2) {
          updateCount++;
          get(parent2);
          return 'two';
        }
        updateCount++;
      }),
      createAtom: createAsyncAtom,
    });
    atom.value.update();
    await awaitTime(20);
    atom.value.update();
    await awaitTime(100);
    expect(atom.relations.parents.size).toBe(1);
    expect(atom.relations.parents.has(parent2)).toBe(true);
  });
  it('save value', async () => {
    const parent1 = new AtomSync({
      value: createStoreSync({
        value: 'parent1',
        get() {
          return this.value;
        },
        set(newValue) {
          this.value = newValue;
        },
      }),
    });
    const parent2 = new AtomSync({
      value: createStoreAsync({
        value: 'parent2',
        get() {
          return this.value;
        },
        set(newValue) {
          this.value = newValue;
        },
      }),
    });
    const atom = await selectAsync({
      ...runCb((get) => {
        return get(parent1) + get(parent2);
      }),
      createAtom: (config) => new AtomAsync(config),
    });
    expect(await atom.value.get()).toBe(
      parent1.value.get() + parent2.value.get()
    );
  });
});
