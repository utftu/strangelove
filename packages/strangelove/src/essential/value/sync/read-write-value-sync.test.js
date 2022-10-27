import {describe, it, jest, expect} from '@jest/globals';
import ReadWriteValueSync from './read-write-value-sync.js';

describe('set()', () => {
  it('not updated', () => {
    const set = jest.fn();
    const valueStore = new ReadWriteValueSync({
      set,
      value: 'hello',
      needCheckPrev: true,
    });
    const setResult = valueStore.set('hello');
    expect(setResult).toBe(false);
    expect(set.mock.calls.length).toBe(0);
  });
  it('updated', () => {
    const set = jest.fn();
    const valueStore = new ReadWriteValueSync({
      set,
      value: 'hello',
      needCheckPrev: true,
    });
    const setResult = valueStore.set('hello-new');
    expect(setResult).toBe(true);
    expect(set.mock.calls.length).toBe(1);
    expect(set.mock.calls[0][0]).toBe('hello-new');
  });
});
