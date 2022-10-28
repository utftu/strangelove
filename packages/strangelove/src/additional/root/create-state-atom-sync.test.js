import {it, expect} from '@jest/globals';
import Root from '../../essential/root/root.js';
import createStateAtomSync from './create-state-atom-sync.js';

it('createStateAtomSync', () => {
  const value = 'hello';
  const newValue = 'new-hello';

  const root = new Root();
  const atom = createStateAtomSync(value, root);
  expect(atom.get()).toBe(value);
  atom.value.update();
  expect(atom.get()).toBe(value);
  atom.value.set(newValue);
  expect(atom.get()).toBe(newValue);
});
