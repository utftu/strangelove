export class Listeners<TValue> {
  subscribe(cb: (data: TValue) => void): (data: TValue) => void;
  unsubscribe(cb: (data: TValue) => void);
  trigger(data: TValue);
}

export default Listeners;
