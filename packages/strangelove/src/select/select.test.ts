import {describe, it, expect} from 'vitest';
import {atom, select} from '../my-atoms/my-atoms.ts';
import {waitTime} from 'utftu';

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
    await parent.set('parent new');
    expect(child.get()).toBe('parent new + child');
  });
  it('select async discard update', async () => {
    const parent = atom('hello');
    let count = 0;
    const selectInstance = await select(async (get) => {
      const value = get(parent);
      if (count++ === 1) {
        await waitTime(10);
      }
      return value;
    });
    const update1 = parent.set('hello 1');
    const update2 = parent.set('hello 2');
    await Promise.all([update1, update2]);
    expect(selectInstance.get()).toBe('hello 2');
  });
});
