import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
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
  const {atoms, customRoot} = useMemo(() => {
    return parseArgs(args);
  }, args);

  const root = useRoot(customRoot);
  const forceUpdate = useForceUpdate();
  const first = useCallback(() => {
    store.changedBeforeMount = true;
  }, []);
  const [store] = useState({
    atom: root.createSyncAtom({
      onUpdate: first,
    }),
    changedBeforeMount: false,
  });

  useMemo(() => {
    if (store.atom) {
      store.atom.relations.replaceParents(new Set());
    }
    atoms.forEach((atom) => Atom.connect(atom, store.atom));
  }, []);

  useEffect(() => {
    store.atom.listeners.unsubscribe(first);
    store.atom.listeners.subscribe(forceUpdate);
  }, []);

  useEffect(() => {
    if (store.changedBeforeMount) {
      store.changedBeforeMount = false;
      forceUpdate();
    }
  }, [store.changedBeforeMount]);

  useEffect(() => {
    return () => {
      store.atom.relations.replaceParents(new Set());
    };
  }, []);

  return atoms.map((atom) => atom.get());
}

export default useStrangeLove;
