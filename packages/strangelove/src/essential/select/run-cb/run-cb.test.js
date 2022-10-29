import createStateAtomSyncRoot from '../../../additional/root/create-state-atom-sync-root.js';
import createDefaultRoot from '../../root/create-default-root.js';
import Root from '../../root/root.js';
import runCb from './run-cb.js';
import {expect, it} from '@jest/globals';

it('run-cb', () => {
  const root = createDefaultRoot();
  const parent1 = createStateAtomSyncRoot('parent1', root);
  const parent2 = createStateAtomSyncRoot('parent2', root);
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
