import {it, jest, expect} from '@jest/globals';
import {AtomAsync} from '../../essential/index.js';
import ReadWriteValueAsync from '../../essential/value/async/read-write-value-async.js';
import AtomAsyncRoot from './atom-async-root.js';

it('AtomRootAsync', async () => {
  const root = {
    update: jest.fn(),
  };
  const name = 'name123';
  const atom = new AtomAsyncRoot({
    value: new ReadWriteValueAsync({
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
