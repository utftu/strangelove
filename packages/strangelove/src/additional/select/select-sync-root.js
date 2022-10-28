import selectSync from '../../essential/select/sync/select-sync.js';
import AtomSyncRoot from '../atom/atom-sync-root.js';

function selectSyncRoot(cb, root) {
  return selectSync(cb, (config) => new AtomSyncRoot({root, ...config}));
}

export default selectSyncRoot;
