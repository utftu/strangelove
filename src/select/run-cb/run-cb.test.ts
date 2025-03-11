import {runCb, type Cb} from './run-cb.ts';
import {expect, it} from 'vitest';
import {Atom} from '../../atom/atom.ts';

it('run-cb', () => {
  const parent1 = new Atom({value: 'parent1'});
  const parent2 = new Atom({value: 'parent2'});
  const resultValue = parent1.get() + parent2.get();
  const initCb: Cb = (get) => {
    const value = get(parent1) + get(parent2);
    return value;
  };

  const {cb, parents, value} = runCb(initCb);

  expect(cb).toBe(initCb);
  expect(parents).toEqual(new Set([parent1, parent2]));
  expect(value).toBe(resultValue);
});
