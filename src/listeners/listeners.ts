type Listener<TValue> = (value: TValue) => void;

export class Listeners<TValue = any> {
  listeners: Listener<TValue>[] = [];
  subscribe(func: Listener<TValue>) {
    this.listeners.push(func);
    return () => this.unsubscribe(func);
  }
  unsubscribe(func: Listener<TValue>) {
    this.listeners = this.listeners.filter((compFunc) => func !== compFunc);
  }
  trigger(data?: TValue) {
    this.listeners.forEach((listener) => listener(data as TValue));
  }
}
