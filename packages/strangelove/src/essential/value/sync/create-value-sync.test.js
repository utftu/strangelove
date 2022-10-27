import {describe, it, expect} from '@jest/globals';
import createValueSync from './create-value-sync.js';
import ReadValueSync from './read-value-sync.js';
import ReadWriteValueSync from './read-write-value-sync.js';

describe('createSyncStore()', () => {
  it('read', () => {
    const store = createValueSync({
      get: () => {},
    });
    expect(store instanceof ReadValueSync).toBe(true);
  });
  it('write', () => {
    const store = createValueSync({
      get: () => {},
      set: () => {},
    });
    expect(store instanceof ReadWriteValueSync).toBe(true);
  });
});
