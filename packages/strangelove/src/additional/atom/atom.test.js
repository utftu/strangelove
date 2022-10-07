import {describe, expect, it, jest} from '@jest/globals';
import {AsyncUserAtom, createSyncStateAtom, SyncUserAtom} from './atom.js';
import {AsyncAtom, SyncAtom} from '../../essential/atom/atom.js';
import {ReadWriteSync, ReadWriteAsync} from '../../essential/index.js';

describe('user atom', () => {
  it('SyncUserAtom', () => {
    const root = {
      update: jest.fn(),
    };
    const name = 'name123';
    const atom = new SyncUserAtom({
      value: new ReadWriteSync({
        get: () => 'hello',
        set: () => '',
      }),
      root,
      name,
    });
    expect(atom instanceof SyncAtom).toBe(true);
    expect(atom.root).toBe(root);
    expect(atom.name).toBe(name);
    expect(atom.get()).toBe('hello');
    atom.set('new-hello');
    expect(root.update.mock.calls.length).toBe(1);
    expect(root.update.mock.calls[0][0]).toBe(atom);
  });
  it('AsyncUserAtom', async () => {
    const root = {
      update: jest.fn(),
    };
    const name = 'name123';
    const atom = new AsyncUserAtom({
      value: new ReadWriteAsync({
        get: async () => 'hello',
        set: async () => '',
      }),
      root,
      name,
    });
    expect(atom instanceof AsyncAtom).toBe(true);
    expect(atom.root).toBe(root);
    expect(atom.name).toBe(name);
    expect(await atom.get()).toBe('hello');
    await atom.set('new-hello');
    expect(root.update.mock.calls.length).toBe(1);
    expect(root.update.mock.calls[0][0]).toBe(atom);
  });
  it('createSyncStateAtom()', () => {
    const oldValue = 'old';
    const newValue = 'new';
    const atom = createSyncStateAtom(oldValue);
    expect(atom.value.get()).toBe(oldValue);
    atom.value.update();
    expect(atom.value.get()).toBe(oldValue);

    atom.value.set(newValue);
    expect(atom.get()).toBe(newValue);
  });
});
