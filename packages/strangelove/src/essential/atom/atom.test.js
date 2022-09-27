import {describe, expect, it} from '@jest/globals';
import Atom from './atom.js';

describe('atom', () => {
  it('static connect()', () => {
    const parentAtom = new Atom();
    const childAtom = new Atom();

    Atom.connect(parentAtom, childAtom);

    expect(parentAtom.relations.children.size).toBe(1);
    expect([...parentAtom.relations.children][0]).toBe(childAtom);

    expect(childAtom.relations.parents.size).toBe(1);
    expect([...childAtom.relations.parents][0]).toBe(parentAtom);
  });

  it('static disconnect()', () => {
    const parentAtom = new Atom();
    const childAtom = new Atom();

    Atom.connect(parentAtom, childAtom);
    Atom.disconnect(parentAtom, childAtom);

    expect(parentAtom.relations.children.size).toBe(0);
    expect(childAtom.relations.parents.size).toBe(0);
  });

  it('constructor()', () => {
    const value = {};
    const onBeforeUpdate = () => {};
    const onUpdate = () => {};
    const atom = new Atom({
      value,
      onBeforeUpdate,
      onUpdate,
    });
    expect(atom.value).toBe(value);
    expect(atom.onBeforeUpdate).toBe(onBeforeUpdate);
    expect(atom.listeners.listeners.length).toBe(1);
    expect(atom.listeners.listeners[0]).toBe(onUpdate);
  });
});
