import {describe, expect, it} from '@jest/globals';
import {AtomRootSync, AtomRootAsync} from '../atom/atom.js';
import RootConnected from './root.js';
import Atom from '../../essential/atom/atom.js';

describe('root connected', () => {
  it('createSyncAtom()', () => {
    const root = new RootConnected();
    const atom = root.createAtomSync();
    expect(atom instanceof AtomRootSync).toBe(true);
  });
  it('createSyncAtom()', () => {
    const root = new RootConnected();
    const atom = root.createAtomAsync();
    expect(atom instanceof AtomRootAsync).toBe(true);
  });
  it('select()', () => {
    const root = new RootConnected();
    const atom = root.select(() => {});
    expect(atom instanceof Atom).toBe(true);
  });
  it('createStateAtomSync', () => {
    const value = 'hello';
    const newValue = 'new-hello';
    const root = new RootConnected();
    const atom = root.createStateAtomSync(value);
    expect(atom.get()).toBe(value);
    atom.value.update();
    expect(atom.get()).toBe(value);
    atom.value.set(newValue);
    expect(atom.get()).toBe(newValue);
  });
  it('createStateAtomAsync', async () => {
    const value = 'hello';
    const newValue = 'new-hello';
    const root = new RootConnected();
    const atom = root.createStateAtomAsync(value);
    expect(await atom.get()).toBe(value);
    await atom.value.update();
    expect(await atom.get()).toBe(value);
    await atom.value.set(newValue);
    expect(await atom.get()).toBe(newValue);
  });
});
