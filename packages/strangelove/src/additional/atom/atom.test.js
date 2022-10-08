import {describe, expect, it, jest} from '@jest/globals';
import {AtomRootAsync, AtomRootSync} from './atom.js';
import {AtomAsync, AtomSync} from '../../essential/atom/atom.js';
import {ReadWriteSync, ReadWriteAsync} from '../../essential/index.js';

describe('additional atom', () => {
  it('AtomRootSync', () => {
    const root = {
      update: jest.fn(),
    };
    const name = 'name123';
    const atom = new AtomRootSync({
      value: new ReadWriteSync({
        get: () => 'hello',
        set: () => '',
      }),
      root,
      name,
    });
    expect(atom instanceof AtomSync).toBe(true);
    expect(atom.root).toBe(root);
    expect(atom.name).toBe(name);
    expect(atom.get()).toBe('hello');
    atom.set('new-hello');
    expect(root.update.mock.calls.length).toBe(1);
    expect(root.update.mock.calls[0][0]).toBe(atom);
  });
  it('AtomRootAsync', async () => {
    const root = {
      update: jest.fn(),
    };
    const name = 'name123';
    const atom = new AtomRootAsync({
      value: new ReadWriteAsync({
        get: async () => 'hello',
        set: async () => '',
      }),
      root,
      name,
    });
    expect(atom instanceof AtomAsync).toBe(true);
    expect(atom.root).toBe(root);
    expect(atom.name).toBe(name);
    expect(await atom.get()).toBe('hello');
    await atom.set('new-hello');
    expect(root.update.mock.calls.length).toBe(1);
    expect(root.update.mock.calls[0][0]).toBe(atom);
  });
});
