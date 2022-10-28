import {describe, expect, it} from '@jest/globals';
import selectRoot from './select-root.js';
import AtomAsyncRoot from '../atom/atom-async-root.js';
import AtomSyncRoot from '../atom/atom-sync-root.js';

describe('additional select', () => {
  it('sync', () => {
    const root = {};
    const atom = selectRoot(() => {}, root);
    expect(atom instanceof AtomSyncRoot).toBe(true);
    expect(atom.root).toBe(root);
  });
  it('async', async () => {
    const root = {};
    const atom = await selectRoot(async () => {}, root);
    expect(atom instanceof AtomAsyncRoot).toBe(true);
    expect(atom.root).toBe(root);
  });
});
