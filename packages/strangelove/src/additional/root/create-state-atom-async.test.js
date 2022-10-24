import {it, expect} from '@jest/globals';
import Root from '../../essential/root/root.js';
import createStateAtomAsync from './create-state-atom-async.js';

it('createStateAtomAsync', async () => {
  const value = 'hello';
  const newValue = 'new-hello';
  const root = new Root();
  const atom = createStateAtomAsync(value, root);
  expect(await atom.get()).toBe(value);
  await atom.value.update();
  expect(await atom.get()).toBe(value);
  await atom.value.set(newValue);
  expect(await atom.get()).toBe(newValue);
});
