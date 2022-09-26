import {useEffect, useMemo, useState} from 'react';
import useForceUpdate from 'utftu/useForceUpdate';
import {Atom, Root} from 'strangelove';
import useRoot from '../user-root/use-root.js';

function parseArgs(args) {
  const atoms = [];
  let customRoot = null;
  for (const arg of args) {
    if (arg instanceof Root) {
      customRoot = arg;
      continue;
    }
    if (arg instanceof Atom) {
      atoms.push(arg);
      continue;
    }
  }

  return {atoms, customRoot};
}

function useStrangeLove(...args) {
  const [store] = useState({});
  const forceUpdate = useForceUpdate();

  const {atoms, customRoot} = useMemo(() => {
    return parseArgs(args);
  }, args);

  const root = useRoot(customRoot);

  const newAtom = useMemo(() => {
    if (store.atom) {
      store.atom.relations.replaceParents(new Set());
    }
    store.atom = root.createSyncAtom({
      onUpdate: forceUpdate,
    });
    atoms.forEach((atom) => Atom.connect(atom, store.atom));
  }, atoms);

  useEffect(() => {
    return () => {
      store.atom.relations.replaceParents(new Set());
    };
  }, []);

  console.log('-----', 'here');
  return atoms.map((atom) => atom.get())
  // return useMemo(() => {
  //   console.log('-----', 'here');
  //   return atoms.map((atom) => atom.get());
  // });
}

export default useStrangeLove;
