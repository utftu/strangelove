import {describe, expect, it, jest} from '@jest/globals';
import Listeners from './listeners.js';

describe('listeners', () => {
  it('subscribe()', () => {
    const listeners = new Listeners();
    const fn = jest.fn();
    const unsubscribe = listeners.subscribe(fn);
    expect(listeners.listeners.length).toBe(1);
    expect(listeners.listeners[0]).toBe(fn);
    expect(fn.mock.calls.length).toBe(0);

    unsubscribe();
    expect(listeners.listeners.length).toBe(0);
  });
  it('unsubscribe()', () => {
    const listeners = new Listeners();
    const fn = jest.fn();
    listeners.subscribe(fn);

    listeners.unsubscribe(fn);
    expect(listeners.listeners.length).toBe(0);
  });
  it('trigger()', () => {
    const listeners = new Listeners();
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    listeners.subscribe(fn1);
    listeners.subscribe(fn2);

    listeners.trigger();
    expect(fn1.mock.calls.length).toBe(1);
    expect(fn2.mock.calls.length).toBe(1);
  });
});
