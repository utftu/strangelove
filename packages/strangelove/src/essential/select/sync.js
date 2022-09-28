import {ReadSync} from '../value/sync.js';
import runCb from './run-cb.js';

function selectSync({cb, value, children, parents, createAtom}) {
  const atom = createAtom({
    value: new ReadSync({
      get() {
        const {value, children, parents} = runCb(cb);

        atom.relations.replaceParents(parents);
        // atom.relations.replaceChildren(children);

        return value;
      },
    }),
  });
  atom.value.setCache(value);
  atom.relations.replaceParents(parents);
  atom.relations.replaceChildren(children);

  return atom;
}

export default selectSync;
