import createStateAtomSync from '../../../additional/root/create-state-atom-sync.js';
import Root from '../../root/root.js';
import runCb from './run-cb.js';
import {expect, it} from '@jest/globals';

it('run-cb', () => {
  const root = new Root();
  const parent1 = createStateAtomSync('parent1', root);
  const parent2 = createStateAtomSync('parent2', root);
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
