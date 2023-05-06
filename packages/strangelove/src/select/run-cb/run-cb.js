export function runCb(cb) {
  const parents = new Set();

  const value = cb((atom) => {
    parents.add(atom);
    return atom.value.get();
  });

  return {
    cb,
    value,
    parents,
  };
}
