import {AtomSync, AtomAsync} from '../../essential/atom/atom.js';

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
    const wasChanged = this.value.set(newValue);
    if (!wasChanged) {
      return false
    }
    return this.root.update(this);
  }
  subscribe(cb) {
    return this.listeners.subscribe(cb)
  }
  unsubscribe(cb) {
    return this.listeners.subscribe(cb)
  }
}

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
    const wasChanged = await this.value.set(newValue);;
    if (!wasChanged) {
      return false
    }
    return this.root.update(this);
  }
  subscribe(cb) {
    return this.listeners.subscribe(cb)
  }
  unsubscribe(cb) {
    return this.listeners.subscribe(cb)
  }
}