/**
 * @jest-environment jsdom
 */

import {render} from '@testing-library/react';
import {createElement} from 'react';
import {describe, expect, it} from '@jest/globals';
import useRoot from './use-root.js';
import defaultRoot from '../default-root.js';
import {createDefaultRoot} from 'strangelove';
import {StrangeLoveProvider} from '../context.js';

describe('use-root', () => {
  it('custom root', () => {
    const customRoot = createDefaultRoot();
    let root;
    function Component() {
      root = useRoot(customRoot);

      return null;
    }
    render(createElement(Component));
    expect(root).toBe(customRoot);
  });
  it('default root', () => {
    let root;
    function Component() {
      root = useRoot();

      return null;
    }
    render(createElement(Component));
    expect(root).toBe(defaultRoot);
  });
  it('context root', () => {
    const contextRoot = new createDefaultRoot();
    function Parent() {
      return createElement(
        StrangeLoveProvider,
        {value: contextRoot},
        createElement(Component)
      );
    }

    let root;
    function Component() {
      root = useRoot();

      return null;
    }
    render(createElement(Parent));
    expect(root).toBe(contextRoot);
  });
});
