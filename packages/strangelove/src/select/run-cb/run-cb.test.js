import {createDefaultRoot} from '../../root/default-root.js';
import {runCb} from './run-cb.js';
import {expect, it} from 'vitest';
import {Atom} from '../../atom/atom.js';

it('run-cb', () => {
  const root = createDefaultRoot();
  const parent1 = Atom.new({root, value: 'parent1'});
  const parent2 = Atom.new({root, value: 'parent2'});
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
