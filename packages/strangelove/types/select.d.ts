import Atom, {AsyncAtom, SyncAtom, AtomConfig} from './atom';

export interface Config<TValue> {
  createAsyncAtom: (config: AtomConfig<TValue>) => AsyncAtom<TValue>;
  createSyncAtom: (config: AtomConfig<TValue>) => SyncAtom<TValue>;
}

export interface SelectHelpers<TValue> {
  get: <TAtomData>(atom: Atom<TAtomData>) => TAtomData;
  set?: <TAtomData>(atom: Atom<TAtomData>, data: TAtomData) => boolean;
}

export type Select<TValue, TConfig = Config<TValue>> = (
  cb: (helpers: SelectHelpers<TValue>) => TValue | undefined,
  config?: Config<TValue>
) => AsyncAtom<TValue> | SyncAtom<TValue>;

export default Select;
