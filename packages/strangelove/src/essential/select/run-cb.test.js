import runCb from './run-cb.js';
import {expect, it} from '@jest/globals';
import {createSyncStateAtom} from '../../additional/index.js';

it('run-cb', () => {
  const parent1 = createSyncStateAtom('parent1');
  const parent2 = createSyncStateAtom('parent2');
  const resultValue = parent1.get() + parent2.get();
  const initCb = (get) => {
    const value = get(parent1) + get(parent2);
    return value;
  };

  const {cb, parents, value} = runCb(initCb);

  expect(cb).toBe(initCb);
  expect(parents).toEqual(new Set([parent1, parent2]));
  expect(value).toBe(resultValue);
});
