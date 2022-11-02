import {AtomSync} from '../../essential/index.js';

class AtomSyncRoot extends AtomSync {
  constructor({root, name, ...atomConfig}) {
    super(atomConfig);
    this.name = name;
    this.root = root;
  }
  get() {
    return this.value.get();
  }
  set(newValue) {
    const wasChanged = this.value.set(newValue);
    if (!wasChanged) {
      return false;
    }
    return this.root.update(this);
  }
  update() {
    return this.root.update(this);
  }
  subscribe(cb) {
    return this.listeners.subscribe(cb);
  }
  unsubscribe(cb) {
    return this.listeners.subscribe(cb);
  }
}

export default AtomSyncRoot;
