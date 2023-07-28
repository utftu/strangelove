import {FastUpdater} from '../updaters/fast/fast.ts';
import {Root} from './root.ts';

export function createDefaultRoot() {
  return Root.new({
    updater: FastUpdater.new(),
  });
}
