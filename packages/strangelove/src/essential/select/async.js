import {AsyncAtom} from '../atom/atom.js';
import {AsyncRead} from '../value/async.js';
import runCb from './run-cb.js';

const updateTimeKey = Symbol('update time');

async function selectAsync({cb, value, children, parents, createAtom}) {
  const atom = createAtom({
    value: new AsyncRead({
      async get() {
        const startDate = Date.now();
        atom[updateTimeKey] = startDate;
        const {value, children, parents} = runCb(cb);
        await value;

        if (atom[updateTimeKey] > startDate) {
          return;
        }

        atom.relations.replaceParents(parents);
        atom.relations.replaceChildren(children);

        return value;
      },
    }),
  });
  // const atom = new AsyncAtom({
  //   value: new ReadAsync({
  //     async get() {
  //       const startDate = Date.now();
  //       atom[updateTimeKey] = startDate;
  //       const {value, children, parents} = runCb(cb);
  //       await value;
  //
  //       if (atom[updateTimeKey] > startDate) {
  //         return;
  //       }
  //
  //       atom.relations.replaceParents(parents);
  //       atom.relations.replaceChildren(children);
  //
  //       return value;
  //     },
  //   }),
  // });

  const syncValue = await value;
  atom.value.setCache(syncValue);
  atom.relations.replaceParents(parents);
  atom.relations.replaceChildren(children);
  return atom;
}

export default selectAsync;
