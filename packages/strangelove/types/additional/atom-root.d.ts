import Atom, {AtomConfig} from '../essential/atom';
import UserRoot from '../user-root';

export interface UserAtomConfig<TValue> extends AtomConfig<TValue> {
  root: UserRoot;
  name?: string;
}

export class SyncUserAtom<TValue> extends Atom<TValue> {
  constructor(config: UserAtomConfig<TValue>);
  root: UserRoot;
  name?: string;
  get(): TValue;
  set(data: TValue): boolean;
}

export class AsyncUserAtom<TValue> extends Atom<TValue> {
  constructor(config: UserAtomConfig<TValue>);
  root: UserRoot;
  name?: string;
  get(): Promise<TValue>;
  set(data: TValue): Promise<boolean>;
}
