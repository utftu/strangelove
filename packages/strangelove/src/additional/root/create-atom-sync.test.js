import {it, expect} from '@jest/globals';
import Root from '../../essential/root/root.js';
import AtomSyncRoot from '../atom/atom-sync-root.js';
import createAtomSyncRoot from './create-atom-sync.js';

it('createSyncAtom()', () => {
  const root = new Root();
  const atom = createAtomSyncRoot({}, root);
  expect(atom instanceof AtomSyncRoot).toBe(true);
});
