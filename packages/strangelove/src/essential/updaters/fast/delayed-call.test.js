import {expect, describe, it} from '@jest/globals';
import awaitTime from 'utftu/awaitTime';
import DelayedCalls from './delayed-calls.js';

describe('delayed calls', () => {
  it('two values', async () => {
    let count = 0;
    const calls = new DelayedCalls((cb) => cb());

    calls.add('1', () => {
      count++;
    });
    calls.add('1', () => {
      count++;
    });
    calls.add('2', () => {
      count++;
    });

    expect(count).toBe(0);
    await awaitTime();
    expect(count).toBe(2);
  });
  it('clear old changes', async () => {
    const calls = new DelayedCalls((cb) => cb());
    let a = 0;
    let b = 0;
    calls.add('a', () => a++);
    calls.add('b', () => b++);
    await awaitTime();
    expect(a).toBe(1);
    expect(b).toBe(1);
    await awaitTime();
    calls.add('a', () => a++);
    await awaitTime();
    expect(a).toBe(2);
    expect(b).toBe(1);
  });
});
