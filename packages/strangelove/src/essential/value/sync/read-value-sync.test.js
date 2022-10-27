import {it, jest, expect, describe} from '@jest/globals';
import ReadValueSync from './read-value-sync.js';

describe('read-value-sync', () => {
  it('init', () => {
    const get = jest.fn();
    const set = jest.fn();
    const value = new ReadValueSync({
      get,
      set,
      value: 'hello',
    });
    expect(value.externalGet === get).toBe(true);
    expect(value.externalSet === set).toBe(true);
    expect(value.needCheckPrev).toBe(true);
    expect(value.get()).toBe('hello');
  });
  it('init not call', () => {
    const get = jest.fn();
    new ReadValueSync({
      get,
    });
    expect(get.mock.calls.length).toBe(0);
  });
  it('update() calls get()', () => {
    const get = jest.fn();
    const atom = new ReadValueSync({
      get,
    });
    expect(get.mock.calls.length).toBe(0);
    atom.update();
    expect(get.mock.calls.length).toBe(1);
  });
  it('cache value', () => {
    const get = jest.fn(() => 'foo');
    const value = new ReadValueSync({
      get,
    });

    value.get();
    expect(value.value).toBe('foo');
    value.get();
    expect(get.mock.calls.length).toBe(1);
  });
});
