/**
 * @jest-environment jsdom
 */

import {render} from '@testing-library/react';
import {describe, expect, it} from "@jest/globals";
import {UserRoot} from "strangelove";
import useStrangeLove from "./use-strange-love.js";
import {createElement} from "react";

describe('use-strange-love', () => {
  it('values', () => {
    const root = new UserRoot()
    const parent1 = root.createSyncStateAtom('parent1')
    const parent2 = root.createSyncStateAtom('parent2')
    let values
    function Component() {
      values = useStrangeLove(parent1, parent2)
      return null
    }
    render(createElement(Component));
    expect(values[0]).toBe(parent1.get())
    expect(values[1]).toBe(parent2.get())
  })
  it('updates', () => {
    const root = new UserRoot()
    const parent1 = root.createSyncStateAtom('parent1')
    const parent2 = root.createSyncStateAtom('parent2')
    let values
    let updateCount
    function Component() {
      values = useStrangeLove(parent1, parent2)
      return null
    }
    render(createElement(Component));
    expect(values[0]).toBe(parent1.get())
    expect(values[1]).toBe(parent2.get())
  })
})