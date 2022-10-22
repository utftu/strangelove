import AtomSyncRoot from '../atom/atom-sync-root.js';

function createAtomSyncRoot(config, root) {
  return new AtomSyncRoot({root, ...config});
}

export default createAtomSyncRoot;
