import useForceUpdate from 'utftu/useForceUpdate';
import {useEffect, useMemo, useState} from 'react';
import useRoot from '../user-root/use-root.js';

function useStrangeLoveSelect(cb, customRoot) {
  const [store] = useState({});
  const forceUpdate = useForceUpdate();

  const root = useRoot();

  useMemo(() => {
    if (store.atom) {
      store.atom.relations.replaceParents(new Set());
    }
    store.atom = root.select(cb);
    store.atom.listeners.subscribe(forceUpdate);
  }, [cb]);

  useEffect(() => {
    return () => {
      store.atom.relations.replaceParents(new Set());
    };
  }, []);

  return store.atom;
}

export default useStrangeLoveSelect;
