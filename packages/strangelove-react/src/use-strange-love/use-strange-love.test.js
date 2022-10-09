/**
 * @jest-environment jsdom
 */

import {render} from '@testing-library/react';
import {describe, expect, it} from '@jest/globals';
import {RootConnected, AtomRootSync} from 'strangelove';
import {act} from 'react-dom/test-utils';
import useStrangeLove from './use-strange-love.js';
import {createElement} from 'react';
import waitTime from "utftu/wait-time.js";

describe('use-strange-love', () => {
  it('values', () => {
    const root = new RootConnected();
    const parent1 = root.createStateAtomSync('parent1');
    const parent2 = root.createStateAtomSync('parent2');
    let values;
    function Component() {
      values = useStrangeLove(parent1, parent2);
      return null;
    }
    render(createElement(Component));
    expect(values[0]).toBe(parent1.get());
    expect(values[1]).toBe(parent2.get());
    expect(values[2] instanceof AtomRootSync).toBe(true);
  });
  it('unsubscribe', () => {
    const root = new RootConnected();
    const parent1 = root.createStateAtomSync('parent1');
    const parent2 = root.createStateAtomSync('parent2');
    let values;
    function Component() {
      values = useStrangeLove(parent1, parent2);
      return null;
    }
    const container = render(createElement(Component));
    container.unmount();
    expect(values[2].relations.parents.size).toBe(0);
  });
  it('updates', async () => {
    const root = new RootConnected();
    const parent1 = root.createStateAtomSync('parent1');
    const parent2 = root.createStateAtomSync('parent2');
    let values;
    let updateCount = 0;
    function Component() {
      values = useStrangeLove(parent1, parent2);
      updateCount++;
      return null;
    }
    await act(() => {
      render(createElement(Component));
    });
    expect(values[0]).toBe(parent1.get());
    expect(values[1]).toBe(parent2.get());
    expect(updateCount).toBe(1);
    await act(async () => {
      parent1.set('parent1-new');
      await waitTime(40);
    });
    expect(values[0]).toBe(parent1.get());
    expect(values[1]).toBe(parent2.get());
    expect(updateCount).toBe(2);
    await act(async () => {
      parent2.set('parent2-new');
      await waitTime(40);
    });
    expect(values[0]).toBe(parent1.get());
    expect(values[1]).toBe(parent2.get());
    expect(updateCount).toBe(3);
  });
});
