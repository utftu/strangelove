import {describe, it, expect} from '@jest/globals';
import createValueAsync from './create-value-async.js';
import ReadValueAsync from './read-value-async.js';
import ReadWriteValueAsync from './read-write-value-async.js';

describe('createValueAsync()', () => {
  it('set', () => {
    const store = createValueAsync({set: () => {}});

    expect(store instanceof ReadWriteValueAsync).toBe(true);
  });
  it('not set', () => {
    const store = createValueAsync({});
    expect(store instanceof ReadValueAsync).toBe(true);
  });
});
