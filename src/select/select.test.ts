import {describe, it, expect} from 'vitest';
import {select} from './select.ts';
import {atom} from '../atom/atom.ts';

describe('select', () => {
  it('select sync', () => {
    const parent = atom('parent');
    const child = select((get) => {
      return get(parent) + ' + ' + 'child';
    });
    parent.set('parent new');
    expect(child.get()).toBe('parent new + child');
  });
});
