import {ReadSync} from '../../value/sync.js';
import runCb from '../run-cb/run-cb.js';

function selectSync({cb, value, parents, createAtom}) {
  const atom = createAtom({
    value: new ReadSync({
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

export default selectSync;
