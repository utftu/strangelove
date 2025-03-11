import {Atom} from '../atom/atom.ts';
import {Cb, runCb} from './run-cb/run-cb.ts';
import {replaceParents} from './utils/utils.ts';

export const select = <TCb extends Cb>(cb: TCb): Atom<ReturnType<TCb>> => {
  const {value, parents} = runCb(cb);

  const atom = createAtom({cb, value});
  replaceParents(atom, parents);

  return atom;
};

export function createAtom<TCb extends Cb>({
  cb,
  value,
}: {
  value: ReturnType<TCb>;
  cb: TCb;
}) {
  const atom = new Atom({
    value,
    exec(atom: Atom<ReturnType<TCb>>) {
      const {value, parents} = runCb(cb);
      replaceParents(atom, parents);
      return atom.value.set(value);
    },
  });

  return atom;
}
