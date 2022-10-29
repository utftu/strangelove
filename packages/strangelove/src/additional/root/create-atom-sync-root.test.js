import {it, expect} from '@jest/globals';
import createDefaultRoot from '../../essential/root/create-default-root.js';
import Root from '../../essential/root/root.js';
import AtomSyncRoot from '../atom/atom-sync-root.js';
import createAtomSyncRoot from './create-atom-sync-root.js';

it('createSyncAtom()', () => {
  const root = createDefaultRoot();
  const atom = createAtomSyncRoot({}, root);
  expect(atom instanceof AtomSyncRoot).toBe(true);
});
