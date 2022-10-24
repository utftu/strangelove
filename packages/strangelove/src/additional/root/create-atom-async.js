import AtomAsyncRoot from '../atom/atom-async-root.js';

function createAtomAsyncRoot(config, root) {
  return new AtomAsyncRoot({
    root,
    ...config,
  });
}

export default createAtomAsyncRoot;
