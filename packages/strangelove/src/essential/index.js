import {Atom, AsyncAtom, SyncAtom} from './atom/atom.js';
import {AsyncRead, AsyncReadWrite, createAsyncStore} from './value/async.js';
import {ReadSync, ReadWriteSync, createSyncStore} from './value/sync.js';
import Root from './root/root.js';
import select from './select/index.js';

export {
  Atom,
  AsyncAtom,
  SyncAtom,
  AsyncRead,
  AsyncReadWrite,
  createAsyncStore,
  ReadSync,
  ReadWriteSync,
  createSyncStore,
  Root,
  select,
};

export default {
  Atom,
  AsyncAtom,
  SyncAtom,
  ReadAsync: AsyncRead,
  ReadWriteAsync: AsyncReadWrite,
  createAsyncStore,
  ReadSync,
  ReadWriteSync,
  createSyncStore,
  Root,
  select,
};
