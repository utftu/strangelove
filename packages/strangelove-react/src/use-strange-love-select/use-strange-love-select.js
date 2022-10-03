import useForceUpdate from 'utftu/useForceUpdate';
import {useCallback, useEffect, useState} from 'react';
import useRoot from '../user-root/use-root.js';

function useStrangeLoveSelect(cb, customRoot) {
  const root = useRoot(customRoot);
  const forceUpdate = useForceUpdate();
  const first = useCallback(() => {
    store.changedBeforeMount = true;
  }, []);
  const [store] = useState(() => {
    const atom = root.select(cb);
    atom.listeners.subscribe(first);
    return {
      atom: atom,
      changedBeforeMount: false,
    };
  });

  useEffect(() => {
    store.atom.listeners.unsubscribe(first);
    if (!store.atom.listeners.listeners.includes(forceUpdate)) {
      store.atom.listeners.subscribe(forceUpdate);
    }
  }, []);

  useEffect(() => {
    return () => {
      store.atom.relations.replaceParents(new Set());
    };
  }, []);

  return store.atom;
}

export default useStrangeLoveSelect;
