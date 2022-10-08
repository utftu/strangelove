import {describe, expect, it} from '@jest/globals';
import {ReadAsync, ReadWriteAsync} from '../../essential/index.js';
import {createAsyncStore} from './async.js';

describe('additional value sync', () => {
  it('set', () => {
    const store = createAsyncStore({set: () => {}});

    expect(store instanceof ReadWriteAsync).toBe(true);
  });
  it('not set', () => {
    const store = createAsyncStore({});
    expect(store instanceof ReadAsync).toBe(true);
  });
});
