import {describe, expect, it} from 'vitest';
import {Value} from './value.ts';

describe('value', () => {
  it('constructor()', () => {
    const value = new Value('hello', {checkPrev: false});
    expect(value.value).toBe('hello');
    expect(value.checkPrev).toBe(false);
  });
  it('get', () => {
    const value = new Value('hello');
    expect(value.get()).toBe('hello');
  });
  it('set() new', () => {
    const value = new Value('hello');
    value.set('world');
    expect(value.value).toBe('world');
  });
  it('set() old', () => {
    const value = new Value('hello');
    const setReturn = value.set('hello');
    expect(setReturn).toBe(false);
  });
  it('set() not checkPrev', () => {
    const value = new Value('hello', {checkPrev: false});
    const setReturn = value.set('hello');
    expect(setReturn).toBe(true);
  });
});
