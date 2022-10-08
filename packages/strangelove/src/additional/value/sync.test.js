import {describe, expect, it} from '@jest/globals';
import {createSyncStore} from './sync.js';
import {ReadSync, ReadWriteSync} from '../../essential/index.js';

describe('additional value sync', () => {
  it('set', () => {
    const store = createSyncStore({set: () => {}});

    expect(store instanceof ReadWriteSync).toBe(true);
  });
  it('not set', () => {
    const store = createSyncStore({});
    expect(store instanceof ReadSync).toBe(true);
  });
});
