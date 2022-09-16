import {useStrangeLoveRoot} from '../context.js';
import defaultRoot from '../default-root.js';

function useRoot(customRoot) {
  const contextRoot = useStrangeLoveRoot();
  if (customRoot) {
    return customRoot;
  }
  if (contextRoot) {
    return contextRoot;
  }
  return defaultRoot;
}

export default useRoot;
