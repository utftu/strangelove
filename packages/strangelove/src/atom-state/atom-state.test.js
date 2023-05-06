import {describe, it, expect, vi} from 'vitest';
import {AtomState} from './atom-state.js';

describe('atom-state', () => {
  it('set() not update', () => {
    const root = {update: vi.fn()};
    const atom = AtomState.new({
      value: 'hello',
    });
    const setReturn = atom.set('hello');
    expect(setReturn).toBe(false);
    expect(root.update.mock.calls.length).toBe(0);
  });
  it('set() return transaction', () => {
    const mockTransaction = {};
    const update = vi.fn().mockReturnValue(mockTransaction);
    const root = {update};
    const atom = AtomState.new({
      root,
      value: 'hello',
    });
    const transaction = atom.set('world');
    expect(transaction).toBe(mockTransaction);
  });
});
