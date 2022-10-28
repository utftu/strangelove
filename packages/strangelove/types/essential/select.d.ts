import {Atom, AtomAsync, AtomConfig, AtomSync} from './atom';

export interface Config<TValue> {
  createAsyncAtom: <TAtom extends AtomAsync<TValue>>(
    config: AtomConfig<TValue>
  ) => TAtom;
  createSyncAtom: <TAtom extends AtomSync<TValue>>(
    config: AtomConfig<TValue>
  ) => TAtom;
}

export function getter<TAtomValue>(atom: Atom<TAtomValue>): TAtomValue;

export default function select<TReturnValue>(
  cb: (get: typeof getter) => TReturnValue,
  config: Config<TReturnValue extends Promise<infer Item> ? Item : TReturnValue>
): TReturnValue extends Promise<infer Item>
  ? AtomAsync<Item>
  : AtomAsync<TReturnValue>;
