import {it, expect} from '@jest/globals';
import Root from '../../essential/root/root.js';
import createAtomAsyncRoot from './create-atom-async.js';
import AtomAsyncRoot from '../atom/atom-async-root.js';

it('createAsyncAtom()', () => {
  const root = new Root();
  const atom = createAtomAsyncRoot({}, root);
  expect(atom instanceof AtomAsyncRoot).toBe(true);
});
