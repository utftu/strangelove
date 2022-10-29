import {it, expect} from '@jest/globals';
import createDefaultRoot from '../../essential/root/create-default-root.js';
import Root from '../../essential/root/root.js';
import createAtomAsyncRoot from './create-atom-async-root.js';
import AtomAsyncRoot from '../atom/atom-async-root.js';

it('createAsyncAtom()', () => {
  const root = createDefaultRoot();
  const atom = createAtomAsyncRoot({}, root);
  expect(atom instanceof AtomAsyncRoot).toBe(true);
});
