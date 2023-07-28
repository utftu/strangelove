import {selectSyncInners} from './sync/select-sync-inners.ts';
import {selectAsyncInners} from './async/select-async-inners.ts';
import {Cb, runCb} from './run-cb/run-cb.ts';
import {Atom} from '../atom/atom.ts';
import {Root} from '../root/root.ts';

export type OnAtomCreate = (atom: Atom) => void;

type Config = {
  onAtomCreate: OnAtomCreate;
  root: Root;
};

type FuncResult<TCb extends (...args: any) => any> =
  ReturnType<TCb> extends Promise<infer TResult>
    ? Promise<TResult>
    : ReturnType<TCb>;

export function select<TCb extends Cb>(
  cb: TCb,
  {root, onAtomCreate}: Config,
): ReturnType<TCb> extends Promise<infer TResult>
  ? Promise<Atom<TResult>>
  : Atom<ReturnType<TCb>> {
  const {value, parents} = runCb<FuncResult<TCb>>(cb);

  if (value instanceof Promise) {
    const result = selectAsyncInners({
      cb,
      value,
      parents,
      root,
      onAtomCreate,
    });
    return result as any;
  } else {
    const result = selectSyncInners({
      cb,
      value,
      parents,
      root,
      onAtomCreate,
    });
    return result as any;
  }
}
