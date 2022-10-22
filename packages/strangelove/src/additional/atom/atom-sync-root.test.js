import {it, jest, expect} from '@jest/globals';
import {ReadWriteSync, AtomSync} from '../../essential/index.js';
import AtomSyncRoot from './atom-sync-root.js';

it('AtomSyncRoot', () => {
  const root = {
    update: jest.fn(),
  };
  const name = 'name123';
  const atom = new AtomSyncRoot({
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
