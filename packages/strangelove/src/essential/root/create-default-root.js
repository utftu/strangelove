import Fast from '../updaters/fast/fast.js';
import Root from './root.js';

export default function createDefaultRoot() {
  return new Root({
    updater: new Fast(),
  });
}
