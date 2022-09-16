import runCb from './run-cb.js';
import {describe, expect, it} from '@jest/globals';
import {SyncAtom} from '../atom/atom.js';
import {createSyncStateAtom} from '../../additional/index.js';

it('run-cb', () => {
  const parent1 = createSyncStateAtom('parent1');
  const parent2 = createSyncStateAtom('parent2');
  const children1 = createSyncStateAtom('children1');
  const resultValue = parent1.get() + parent2.get();
  const initCb = ({get, set}) => {
    const value = get(parent1) + get(parent2);
    set(children1, value);
    return value;
  };

  const {cb, parents, children, value} = runCb(initCb);

  expect(cb).toBe(initCb);
  expect(parents).toEqual(new Set([parent1, parent2]));
  expect(children).toEqual(new Set(children));
  expect(value).toBe(resultValue);
  expect(children1.get()).toBe(resultValue);
});
