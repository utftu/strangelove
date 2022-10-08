import {AtomRootSync, AtomRootAsync} from './atom/atom.js';
import RootConnected from './root/root.js';
import {createAsyncStore} from './value/async.js';
import {createSyncStore} from './value/sync.js';

export {
  AtomRootSync,
  AtomRootAsync,
  RootConnected,
  createAsyncStore,
  createSyncStore,
};

export default {
  SyncUserAtom: AtomRootSync,
  AsyncUserAtom: AtomRootAsync,
  UserRoot: RootConnected,
  createAsyncStore,
  createSyncStore,
};
