import Atom from './atom';
import AtomAsync, {AtomAsyncProps} from './atom-async';
import AtomSync, {AtomSyncProps} from './atom-sync';

export interface SelectConfig<TValue> {
  createAsyncAtom: <TAtom extends AtomAsync<TValue>>(
    config: AtomAsyncProps<TValue>
  ) => TAtom;
  createSyncAtom: <TAtom extends AtomSync<TValue>>(
    config: AtomSyncProps<TValue>
  ) => TAtom;
}

export function getter<TAtomValue>(atom: Atom<TAtomValue>): TAtomValue;

export default function select<TReturnValue>(
  cb: (get: typeof getter) => TReturnValue,
  config: SelectConfig<
    TReturnValue extends Promise<infer Item> ? Item : TReturnValue
  >
): TReturnValue extends Promise<infer Item>
  ? AtomAsync<Item>
  : AtomAsync<TReturnValue>;
