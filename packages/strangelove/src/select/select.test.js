import {describe, it, expect} from 'vitest';
import {atom, select} from '../my-atoms/my-atoms.js';

describe('select', () => {
  it('select sync', () => {
    const parent = atom('parent');
    const child = select((get) => {
      return get(parent) + ' + ' + 'child';
    });
    parent.set('parent new');
    expect(child.get()).toBe('parent new + child');
  });
  it('select async', async () => {
    const parent = atom('parent');
    const child = await select(async (get) => {
      return get(parent) + ' + ' + 'child';
    });
    const transaction = parent.set('parent new');
    await transaction.promise;
    expect(child.get()).toBe('parent new + child');
  });
});
