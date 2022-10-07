import {SyncAtom, AsyncAtom} from '../../essential/atom/atom.js';
import {createSyncStore} from '../../essential/value/sync.js';

export class SyncUserAtom extends SyncAtom {
  constructor({root, name, ...atomConfig}) {
    super(atomConfig);
    this.name = name;
    this.root = root;
  }
  get() {
    return this.value.get();
  }
  set(newValue) {
    this.value.set(newValue);
    return this.root.update(this);
  }
}

export function createSyncStateAtom(value) {
  return new SyncUserAtom({
    value: createSyncStore({
      get() {
        return this.value;
      },
      set(newValue) {
        this.value = newValue;
      },
      value,
    }),
  });
}

export class AsyncUserAtom extends AsyncAtom {
  constructor({root, name, ...atomConfig}) {
    super(atomConfig);
    this.name = name;
    this.root = root;
  }
  get() {
    return this.value.get();
  }
  async set(newValue) {
    await this.value.set(newValue);
    return this.root.update(this);
  }
}
