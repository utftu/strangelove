import selectAsync from '../../essential/select/async/select-async.js';
import AtomAsyncRoot from '../atom/atom-async-root.js';

function selectAsyncRoot(cb, root) {
  return selectAsync(cb, (config) => new AtomAsyncRoot({root, ...config}));
}

export default selectAsyncRoot;
