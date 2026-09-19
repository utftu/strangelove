import {describe, expect, it, mock} from "bun:test";
import {Listeners} from './listeners.ts';

describe('listeners', () => {
  it('subscribe()', () => {
    const listeners = new Listeners();
    const fn = mock();
    const unsubscribe = listeners.subscribe(fn);
    expect(listeners.listeners.length).toBe(1);
    expect(listeners.listeners[0]).toBe(fn);
    expect(fn.mock.calls.length).toBe(0);

    unsubscribe();
    expect(listeners.listeners.length).toBe(0);
  });
  it('unsubscribe()', () => {
    const listeners = new Listeners();
    const fn = mock();
    listeners.subscribe(fn);

    listeners.unsubscribe(fn);
    expect(listeners.listeners.length).toBe(0);
  });
  it('trigger()', () => {
    const listeners = new Listeners();
    const fn1 = mock();
    const fn2 = mock();

    listeners.subscribe(fn1);
    listeners.subscribe(fn2);

    listeners.trigger();
    expect(fn1.mock.calls.length).toBe(1);
    expect(fn2.mock.calls.length).toBe(1);
  });
});
