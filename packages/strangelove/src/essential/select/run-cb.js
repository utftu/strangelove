function runCb(cb) {
  const parents = new Set();
  const children = new Set();

  const value = cb({
    get: (atom) => {
      parents.add(atom);
      return atom.value.get();
    },
    set: (atom, newValue) => {
      children.add(atom);
      return atom.value.set(newValue);
    },
  });

  return {
    cb,
    value,
    parents,
    children,
  };
}

export default runCb;
