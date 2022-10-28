import {it, jest, expect} from '@jest/globals';
import {AtomSync} from '../../essential/index.js';
import ReadWriteValueSync from '../../essential/value/sync/read-write-value-sync.js';
import AtomSyncRoot from './atom-sync-root.js';

it('AtomSyncRoot', () => {
  const root = {
    update: jest.fn(),
  };
  const name = 'name123';
  const atom = new AtomSyncRoot({
    value: new ReadWriteValueSync({
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
