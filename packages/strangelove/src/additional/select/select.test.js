import {describe, expect, it} from '@jest/globals';
import selectRoot from './select.js';
import {AtomRootAsync, AtomRootSync} from '../atom/atom.js';

describe('additional select', () => {
  it('sync', () => {
    const root = {};
    const atom = selectRoot(() => {}, root);
    expect(atom instanceof AtomRootSync).toBe(true);
    expect(atom.root).toBe(root);
  });
  it('async', async () => {
    const root = {};
    const atom = await selectRoot(async () => {}, root);
    expect(atom instanceof AtomRootAsync).toBe(true);
    expect(atom.root).toBe(root);
  });
});
