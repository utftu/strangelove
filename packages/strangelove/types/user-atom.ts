import Atom, {AtomConfig} from './atom';
import UserRoot from './user-root';

export interface UserAtomConfig<TValue> extends AtomConfig<TValue> {
  root: UserRoot;
  name?: string;
}

export declare class SyncUserAtom<TValue> extends Atom<TValue> {
  constructor(config: UserAtomConfig<TValue>);
  get(): TValue;
  set(data: TValue): boolean;
}

export declare class AsyncUserAtom<TValue> extends Atom<TValue> {
  constructor(config: UserAtomConfig<TValue>);
  get(): Promise<TValue>;
  set(data: TValue): Promise<boolean>;
}
