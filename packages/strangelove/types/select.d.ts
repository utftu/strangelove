import Atom, {AsyncAtom, SyncAtom, AtomConfig} from './atom';

export interface Config<TValue> {
  createAsyncAtom: (config: AtomConfig<TValue>) => AsyncAtom<TValue>;
  createSyncAtom: (config: AtomConfig<TValue>) => SyncAtom<TValue>;
}

export interface Helpers<TValue> {
  get: <TAtomData>(atom: Atom<TAtomData>) => TAtomData;
  set: <TAtomData>(atom: Atom<TAtomData>, data: TAtomData) => boolean;
}

declare function select<TValue, TConfig = Config<TValue>>(
  cb: (helpers: Helpers<TValue>) => TValue | undefined,
  config: Config<TValue>
): AsyncAtom<TValue> | SyncAtom<TValue>;

export default select;
