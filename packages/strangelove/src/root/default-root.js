import {FastUpdater} from '../updaters/fast/fast.js';
import {Root} from './root.js';

export function createDefaultRoot() {
  return Root.new({
    updater: FastUpdater.new(),
  });
}
