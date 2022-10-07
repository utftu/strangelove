import {describe, expect, it, jest} from '@jest/globals';
import awaitTime from 'utftu/awaitTime';
import {createAsyncStore, ReadAsync, ReadWriteAsync} from './async.js';

describe('value sync', () => {
  describe('AsyncRead', () => {
    it('init', async () => {
      const get = jest.fn(async () => 'new value');
      const valueStore = new ReadAsync({
        get,
        value: 'hello',
      });
      expect(get.mock.calls.length).toBe(0);
      expect(await valueStore.asyncValue).toBe('hello');
      expect(valueStore.syncValue).toBe('hello');
    });
    it('getSync()', () => {
      const valueStore = new ReadAsync({
        value: 'hello',
      });
      expect(valueStore.getSync()).toBe('hello');
    });
    it('empty get()', async () => {
      const valueStore = new ReadAsync({
        async get() {
          return 'hello';
        },
      });
      expect(await valueStore.get()).toBe('hello');
    });
    it('setCacheAsync()', async () => {
      const valueStore = new ReadAsync({});
      await valueStore.setCacheAsync(Promise.reject('hello'));
      expect(valueStore.syncValue).toBe('hello');
    });
  });
  describe('AsyncReadWrite', () => {
    it('set value', async () => {
      const get = jest.fn(async () => {});
      const set = jest.fn(async (newValue) => newValue + ' hello');
      const store = new ReadWriteAsync({
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
      const atom = await new ReadWriteAsync({
        get,
        set,
      });
      atom.set('foo');
      await atom.update();
      expect(await set.mock.results[0].value).toBe('foo bar');
      expect(get.mock.calls.length).toBe(1);
    });
    it('not updated set()', async () => {
      const set = jest.fn();
      const store = new ReadWriteAsync({
        set,
        value: 'hello',
        needCheckPrev: true,
      });
      const setResult = await store.set('hello');
      expect(setResult).toBe(false);
      expect(set.mock.calls.length).toBe(0);
    });
  });
  describe('createAsyncStore()', () => {
    it('read', () => {
      const store = createAsyncStore({
        get: () => {},
      });
      expect(store instanceof ReadAsync).toBe(true);
    });
    it('write', () => {
      const store = createAsyncStore({
        get: () => {},
        set: () => {},
      });
      expect(store instanceof ReadWriteAsync).toBe(true);
    });
  });
});
