import {describe, it, expect, jest} from '@jest/globals';
import {AsyncAtom, SyncAtom} from '../atom/atom.js';
import runCb from './run-cb.js';
import Root from '../root/root.js';
import selectAsync from './async.js';
import {ReadWriteAsync} from '../value/async.js';

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

const createAsyncAtom = (config) => new AsyncAtom(config);

describe('async', () => {
  it('async get', async () => {
    const parent1Value = 'parent1 value';
    const newParent1Value = 'new parent1 value';
    const parent2Value = 'parent2 value';

    const parent1 = new SyncAtom({value: createReadWriteAsync(parent1Value)});
    const parent2 = new SyncAtom({value: createReadWriteAsync(parent2Value)});

    const calls = jest.fn();
    const selectorAtom = await selectAsync({
      ...runCb(async ({get}) => {
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
  // it('discard old updates');
});
