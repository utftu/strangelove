import {AtomSync, AtomAsync} from '../../essential/atom/atom.js';
import {createStoreSync} from '../../essential/value/sync.js';
import {createAsyncStore} from '../value/async.js';

export class AtomRootSync extends AtomSync {
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

// export function createStateAtomSync(value) {
//   return new AtomRootSync({
//     value: createStoreSync({
//       get() {
//         return this.value;
//       },
//       set(newValue) {
//         this.value = newValue;
//       },
//       value,
//     }),
//   });
// }

export class AtomRootAsync extends AtomAsync {
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
//
// export function createStateAtomSync(value) {
//   return new AtomRootSync({
//     value: createAsyncStore({
//       get() {
//         return this.value;
//       },
//       set(newValue) {
//         this.value = newValue;
//       },
//       value,
//     }),
//   });
// }
