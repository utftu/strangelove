import {describe, it, expect} from '@jest/globals';
import {AtomAsync, AtomSync} from '../atom/atom.js';
import select from './select.js';

describe('select', () => {
  it('sync', () => {
    const atom = select(() => {});
    expect(atom instanceof AtomSync).toBe(true);
  });
  it('async', async () => {
    const atom = await select(async () => {});
    expect(atom instanceof AtomAsync).toBe(true);
  });
});
