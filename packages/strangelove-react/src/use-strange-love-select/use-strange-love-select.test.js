/**
 * @jest-environment jsdom
 */

import {render} from '@testing-library/react';
import {describe, expect, it} from '@jest/globals';
import {UserRoot} from 'strangelove';
import {act} from 'react-dom/test-utils';
import useStrangeLoveSelect from './use-strange-love-select.js';
// import useStrangeLove from './use-strange-love.js';
import {createElement} from 'react';
import awaitTime from 'utftu/awaitTime';

describe('use-strange-love', () => {
  it('values', async () => {
    const root = new UserRoot();
    const parent1 = root.createSyncStateAtom('parent1');
    const parent2 = root.createSyncStateAtom('parent2');
    let atom;
    let updateCount = 0;
    function Component() {
      updateCount++;
      atom = useStrangeLoveSelect((get) => {
        return get(parent1) + get(parent2);
      });
      return null;
    }
    render(createElement(Component));
    expect(updateCount).toBe(1);
    expect(atom.get()).toBe(parent1.get() + parent2.get());
  });
  it('unsubscribe', async () => {
    const root = new UserRoot();
    const parent1 = root.createSyncStateAtom('parent1');
    const parent2 = root.createSyncStateAtom('parent2');
    let atom;
    function Component() {
      atom = useStrangeLoveSelect((get) => {
        return get(parent1) + get(parent2);
      });
      return null;
    }
    const container = render(createElement(Component));
    container.unmount();
    expect(atom.relations.parents.size).toBe(0);
  });
  it('updates', async () => {
    const root = new UserRoot();
    const parent1 = root.createSyncStateAtom('parent1');
    const parent2 = root.createSyncStateAtom('parent2');
    let atom;
    let updateCount = 0;
    function Component() {
      updateCount++;
      atom = useStrangeLoveSelect((get) => {
        return get(parent1) + get(parent2);
      });
      return null;
    }
    render(createElement(Component));
    expect(updateCount).toBe(1);
    expect(atom.get()).toBe(parent1.get() + parent2.get());
    await act(async () => {
      parent1.set('parent1-new');
      await awaitTime(100);
    });
    expect(updateCount).toBe(2);
    expect(atom.get()).toBe(parent1.get() + parent2.get());
    await act(async () => {
      parent2.set('parent2-new');
      await awaitTime(100);
    });
    expect(updateCount).toBe(3);
    expect(atom.get()).toBe(parent1.get() + parent2.get());
  });
});
