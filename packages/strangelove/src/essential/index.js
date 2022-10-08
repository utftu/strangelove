import {Atom, AtomAsync, AtomSync} from './atom/atom.js';
import {ReadAsync, ReadWriteAsync, createStoreAsync} from './value/async.js';
import {ReadSync, ReadWriteSync, createStoreSync} from './value/sync.js';
import Root from './root/root.js';
import select from './select/index.js';

export {
  Atom,
  AtomAsync,
  AtomSync,
  ReadAsync,
  ReadWriteAsync,
  createStoreAsync,
  ReadSync,
  ReadWriteSync,
  createStoreSync,
  Root,
  select,
};

export default {
  Atom,
  AsyncAtom: AtomAsync,
  SyncAtom: AtomSync,
  ReadAsync,
  ReadWriteAsync,
  createAsyncStore: createStoreAsync,
  ReadSync,
  ReadWriteSync,
  createSyncStore: createStoreSync,
  Root,
  select,
};
