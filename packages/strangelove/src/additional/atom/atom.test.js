import {describe, expect, it} from '@jest/globals';
import {createSyncStateAtom} from './atom.js';

describe('atom', () => {
  it('createSyncStateAtom()', () => {
    const oldValue = 'old';
    const newValue = 'new';
    const atom = createSyncStateAtom(oldValue);
    expect(atom.value.get()).toBe(oldValue);

    atom.value.set(newValue);
    expect(atom.get()).toBe(newValue);
  });
});
