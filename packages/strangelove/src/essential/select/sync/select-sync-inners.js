import runCb from '../run-cb/run-cb.js';
import ReadValueSync from '../../value/sync/read-value-sync.js';

function selectSyncInners({cb, value, parents, createAtom}) {
  const atom = createAtom({
    value: new ReadValueSync({
      get() {
        const {value, parents} = runCb(cb);

        atom.relations.replaceParents(parents);

        return value;
      },
    }),
  });
  atom.value.setCache(value);
  atom.relations.replaceParents(parents);

  return atom;
}

export default selectSyncInners;
