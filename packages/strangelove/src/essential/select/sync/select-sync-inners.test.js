import createValueSync from '../../value/sync/create-state-value-sync.js';
import ReadWriteValueSync from '../../value/sync/read-write-value-sync.js';
import selectSyncInners from './select-sync-inners.js';
import {describe, expect, it, jest} from '@jest/globals';
import {AtomSync} from '../../atom/atom.js';
import Root from '../../root/root.js';
import runCb from '../run-cb/run-cb.js';

function createReadWriteSync(value) {
  return new ReadWriteValueSync({
    value,
    get() {
      return this.value;
    },
    set(value) {
      this.value = value;
    },
  });
}

const createSyncAtom = (config) => new AtomSync(config);

describe('select sync', () => {
  it('sync get', () => {
    const parent1Value = 'parent1 value';
    const newParent1Value = 'new parent1 value';
    const parent2Value = 'parent2 value';

    const parent1 = new AtomSync({value: createReadWriteSync(parent1Value)});
    const parent2 = new AtomSync({value: createReadWriteSync(parent2Value)});

    const calls = jest.fn();
    const selectorAtom = selectSyncInners({
      ...runCb((get) => {
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

    const parent1 = new AtomSync({value: createReadWriteSync(parent1Value)});
    const parent2 = new AtomSync({value: createReadWriteSync(parent2Value)});

    const selector = selectSyncInners({
      ...runCb((get) => {
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
  it('save value', () => {
    const parent1 = new AtomSync({
      value: createValueSync({
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
      value: createValueSync({
        value: 'parent2',
        get() {
          return this.value;
        },
        set(newValue) {
          this.value = newValue;
        },
      }),
    });
    const atom = selectSyncInners({
      ...runCb((get) => {
        return get(parent1) + get(parent2);
      }),
      createAtom: (config) => new AtomSync(config),
    });
    expect(atom.value.get()).toBe(parent1.value.get() + parent2.value.get());
  });
});
