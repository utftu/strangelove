import selectSync from './sync.js';
import {describe, expect, it, jest} from '@jest/globals';
import {ReadWriteSync} from '../value/sync.js';
import {SyncAtom} from '../atom/atom.js';
import Root from '../root/root.js';
import runCb from './run-cb.js';

function createReadWriteSync(value) {
  return new ReadWriteSync({
    value,
    get() {
      return this.value;
    },
    set(value) {
      this.value = value;
    },
  });
}

const createSyncAtom = (config) => new SyncAtom(config);

describe('select sync', () => {
  it('sync get', () => {
    const parent1Value = 'parent1 value';
    const newParent1Value = 'new parent1 value';
    const parent2Value = 'parent2 value';

    const parent1 = new SyncAtom({value: createReadWriteSync(parent1Value)});
    const parent2 = new SyncAtom({value: createReadWriteSync(parent2Value)});

    const calls = jest.fn();
    const selectorAtom = selectSync({
      ...runCb(({get}) => {
        const parent1Value = get(parent1);
        const parent2Value = get(parent2);
        calls(parent1Value + parent2Value);
      }),
      createAtom: createSyncAtom,
    });
    expect(selectorAtom.relations.parents.size).toBe(2);
    expect(parent1.relations.children.size).toBe(1);
    expect(parent2.relations.children.size).toBe(1);

    expect(calls.mock.calls.length).toBe(1);
    expect(calls.mock.calls[0][0]).toBe(parent1Value + parent2Value);

    const root = new Root();

    parent1.value.set(newParent1Value);
    root.update(parent1);
    expect(calls.mock.calls.length).toBe(2);
    expect(calls.mock.calls[1][0]).toBe(newParent1Value + parent2Value);
  });
  it('change parent', () => {
    const parent1Value = 'parent1 value';
    const parent2Value = 'parent2 value';
    let parentNum = 1;

    const parent1 = new SyncAtom({value: createReadWriteSync(parent1Value)});
    const parent2 = new SyncAtom({value: createReadWriteSync(parent2Value)});

    const selector = selectSync({
      ...runCb(({get}) => {
        if (parentNum === 1) {
          get(parent1);
        } else {
          get(parent2);
        }
      }),
      createAtom: createSyncAtom,
    });
    expect(selector.relations.parents.size).toBe(1);
    expect([...selector.relations.parents][0]).toBe(parent1);
    parentNum = 2;
    const root = new Root();

    root.update(parent1);
    expect(selector.relations.parents.size).toBe(1);
    expect([...selector.relations.parents][0]).toBe(parent2);
  });
});
