import {describe, expect, it, jest} from '@jest/globals';
import awaitTime from 'utftu/awaitTime';
import {createAsyncStore, AsyncRead, AsyncReadWrite} from './async.js';
import {createSyncStore, ReadSync, ReadWriteSync} from './sync.js';

describe('value sync', () => {
  describe('read value', () => {
    it('init call', async () => {
      const get = jest.fn(async () => 'new value');
      await new AsyncRead({
        get,
      });
      expect(get.mock.calls.length).toBe(0);
    });
  });
  it('set value', async () => {
    const get = jest.fn(async () => {});
    const set = jest.fn(async (newValue) => newValue + ' hello');
    const store = new AsyncReadWrite({
      get,
      set,
    });
    await store.set('new value');
    expect(store.syncValue).toBe('new value');
    expect(await store.asyncValue).toBe('new value');
    expect(await set.mock.results[0].value).toBe('new value hello');
    expect(get.mock.calls.length).toBe(0);
  });
  it('update wait set', async () => {
    const get = jest.fn(async () => {});
    const set = jest.fn(async (newValue) => {
      await awaitTime(10);
      return newValue + ' bar';
    });
    const atom = await new AsyncReadWrite({
      get,
      set,
    });
    atom.set('foo');
    await atom.update();
    expect(await set.mock.results[0].value).toBe('foo bar');
    expect(get.mock.calls.length).toBe(1);
  });
  describe('createAsyncStore()', () => {
    it('read', () => {
      const store = createAsyncStore({
        get: () => {},
      });
      expect(store instanceof AsyncRead).toBe(true);
    });
    it('write', () => {
      const store = createAsyncStore({
        get: () => {},
        set: () => {},
      });
      expect(store instanceof AsyncReadWrite).toBe(true);
    });
  });
});
