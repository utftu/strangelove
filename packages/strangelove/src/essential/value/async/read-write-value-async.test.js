import {describe, it, jest, expect} from '@jest/globals';
import waitTime from 'utftu/wait-time.js';
import ReadWriteValueAsync from './read-write-value-async.js';

describe('ReadWriteValueAsync', () => {
  it('set value', async () => {
    const get = jest.fn(async () => {});
    const set = jest.fn(async (newValue) => newValue + ' hello');
    const store = new ReadWriteValueAsync({
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
      await waitTime(10);
      return newValue + ' bar';
    });
    const atom = await new ReadWriteValueAsync({
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
    const store = new ReadWriteValueAsync({
      set,
      value: 'hello',
      needCheckPrev: true,
    });
    const setResult = await store.set('hello');
    expect(setResult).toBe(false);
    expect(set.mock.calls.length).toBe(0);
  });
});
