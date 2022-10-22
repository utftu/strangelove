import {AtomRootSync, AtomRootAsync} from './atom/atom.js';
import RootConnected from './root/root.js';

export {AtomRootSync, AtomRootAsync, RootConnected};

export default {
  SyncUserAtom: AtomRootSync,
  AsyncUserAtom: AtomRootAsync,
  UserRoot: RootConnected,
};
