import {AtomAsync} from '../../essential/index.js';

class AtomAsyncRoot extends AtomAsync {
  constructor({root, name, ...atomConfig}) {
    super(atomConfig);
    this.name = name;
    this.root = root;
  }
  get() {
    return this.value.get();
  }
  async set(newValue) {
    const wasChanged = await this.value.set(newValue);
    if (!wasChanged) {
      return false;
    }
    return this.root.update(this);
  }
  subscribe(cb) {
    return this.listeners.subscribe(cb);
  }
  unsubscribe(cb) {
    return this.listeners.subscribe(cb);
  }
}

export default AtomAsyncRoot;
