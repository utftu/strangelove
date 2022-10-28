import {it, expect} from '@jest/globals';
import Root from '../../essential/root/root.js';
import createStateAtomSyncRoot from './create-state-atom-sync-root.js';

it('createStateAtomSync', () => {
  const value = 'hello';
  const newValue = 'new-hello';

  const root = new Root();
  const atom = createStateAtomSyncRoot(value, root);
  expect(atom.get()).toBe(value);
  atom.value.update();
  expect(atom.get()).toBe(value);
  atom.value.set(newValue);
  expect(atom.get()).toBe(newValue);
});
