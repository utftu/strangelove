import {describe, it, jest, expect} from '@jest/globals';
import ReadValueAsync from './read-value-async.js';

describe('ReadValueAsync', () => {
  it('init', async () => {
    const get = jest.fn(async () => 'new value');
    const valueStore = new ReadValueAsync({
      get,
      value: 'hello',
    });
    expect(get.mock.calls.length).toBe(0);
    expect(await valueStore.asyncValue).toBe('hello');
    expect(valueStore.syncValue).toBe('hello');
  });
  it('getSync()', () => {
    const valueStore = new ReadValueAsync({
      value: 'hello',
    });
    expect(valueStore.getSync()).toBe('hello');
  });
  it('empty get()', async () => {
    const valueStore = new ReadValueAsync({
      async get() {
        return 'hello';
      },
    });
    expect(await valueStore.get()).toBe('hello');
  });
  it('setCacheAsync()', async () => {
    const valueStore = new ReadValueAsync({});
    await valueStore.setCacheAsync(Promise.reject('hello'));
    expect(valueStore.syncValue).toBe('hello');
  });
});
