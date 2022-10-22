import {ReadAsync} from '../../value/async.js';
import runCb from '../run-cb/run-cb.js';

const updateTimeKey = Symbol('update time');

async function selectAsync({cb, value, parents, createAtom}) {
  const atom = createAtom({
    value: new ReadAsync({
      async get() {
        const startDate = Date.now();
        atom[updateTimeKey] = startDate;
        const {value, parents} = runCb(cb);
        await value;

        if (atom[updateTimeKey] > startDate) {
          return;
        }

        atom.relations.replaceParents(parents);

        return value;
      },
    }),
  });

  const syncValue = await value;
  atom.value.setCache(syncValue);
  atom.relations.replaceParents(parents);
  return atom;
}

export default selectAsync;
