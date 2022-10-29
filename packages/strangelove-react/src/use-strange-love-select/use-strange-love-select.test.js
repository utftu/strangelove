/**
 * @jest-environment jsdom
 */

import {render} from '@testing-library/react';
import {describe, expect, it} from '@jest/globals';
import {
  createDefaultRoot,
  createStateAtomSyncRoot,
  AtomSyncRoot,
} from 'strangelove';
import {act} from 'react-dom/test-utils';
import useStrangeLoveSelect from './use-strange-love-select.js';
import {createElement} from 'react';
import waitTime from 'utftu/wait-time.js';

describe('use-strange-love', () => {
  it.only('values', async () => {
    const root = createDefaultRoot();
    const parent1 = createStateAtomSyncRoot('parent1', root);
    const parent2 = createStateAtomSyncRoot('parent2', root);
    let values;
    let updateCount = 0;
    function Component() {
      updateCount++;
      values = useStrangeLoveSelect((get) => {
        return get(parent1) + get(parent2);
      });
      return null;
    }
    render(createElement(Component));
    expect(updateCount).toBe(1);
    expect(values[0]).toBe(parent1.get() + parent2.get());
    console.log('-----', 'values[1].constructor', values[1].constructor);
    expect(values[1] instanceof AtomSyncRoot).toBe(true);
  });
  it('unsubscribe', async () => {
    const root = createDefaultRoot();
    const parent1 = createStateAtomSyncRoot('parent1', root);
    const parent2 = createStateAtomSyncRoot('parent2', root);
    let values;
    function Component() {
      values = useStrangeLoveSelect((get) => {
        return get(parent1) + get(parent2);
      });
      return null;
    }
    const container = render(createElement(Component));
    container.unmount();
    expect(values[1].relations.parents.size).toBe(0);
  });
  it('updates', async () => {
    const root = createDefaultRoot();
    const parent1 = createStateAtomSyncRoot('parent1', root);
    const parent2 = createStateAtomSyncRoot('parent2', root);
    let values;
    let updateCount = 0;
    function Component() {
      updateCount++;
      values = useStrangeLoveSelect((get) => {
        return get(parent1) + get(parent2);
      });
      return null;
    }
    render(createElement(Component));
    expect(updateCount).toBe(1);
    expect(values[0]).toBe(parent1.get() + parent2.get());
    await act(async () => {
      parent1.set('parent1-new');
      await waitTime(100);
    });
    expect(updateCount).toBe(2);
    expect(values[0]).toBe(parent1.get() + parent2.get());
    await act(async () => {
      parent2.set('parent2-new');
      await waitTime(100);
    });
    expect(updateCount).toBe(3);
    expect(values[0]).toBe(parent1.get() + parent2.get());
  });
});
