import AtomAsyncRoot from '../atom/atom-async-root.js';

function createAtomAsyncRoot(config) {
  return new AtomAsyncRoot({
    root: this,
    ...config,
  });
}

export default createAtomAsyncRoot;
