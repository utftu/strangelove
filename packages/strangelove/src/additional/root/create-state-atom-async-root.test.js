import {it, expect} from '@jest/globals';
import createDefaultRoot from '../../essential/root/create-default-root.js';
import Root from '../../essential/root/root.js';
import createStateAtomAsyncRoot from './create-state-atom-async-root.js';

it('createStateAtomAsync', async () => {
  const value = 'hello';
  const newValue = 'new-hello';
  const root = createDefaultRoot();
  const atom = createStateAtomAsyncRoot(value, root);
  expect(await atom.get()).toBe(value);
  await atom.value.update();
  expect(await atom.get()).toBe(value);
  await atom.value.set(newValue);
  expect(await atom.get()).toBe(newValue);
});
