import {it, expect} from '@jest/globals';
import RootConnected from './root.js';

it('createStateAtomSync', () => {
  const value = 'hello';
  const newValue = 'new-hello';
  const root = new RootConnected();
  const atom = root.createStateAtomSync(value);
  expect(atom.get()).toBe(value);
  atom.value.update();
  expect(atom.get()).toBe(value);
  atom.value.set(newValue);
  expect(atom.get()).toBe(newValue);
});
