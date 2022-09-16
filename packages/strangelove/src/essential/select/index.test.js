import {describe, it, expect} from '@jest/globals';
import {AsyncAtom, SyncAtom} from '../atom/atom.js';
import select from './index.js';

describe('select', () => {
  it('sync', () => {
    const atom = select(() => {});
    expect(atom instanceof SyncAtom).toBe(true);
  });
  it('async', async () => {
    const atom = await select(async () => {});
    expect(atom instanceof AsyncAtom).toBe(true);
  });
});
