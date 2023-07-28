import {createSignal, onCleanup} from 'solid-js';

type Get<TValue> = () => TValue;
type Cb<TValue> = (value: TValue) => void;
type Subscribe<TValue> = (cb: Cb<TValue>) => () => void;

export function createStore<TValue>(
  get: Get<TValue>,
  subscribe: Subscribe<TValue>,
) {
  const [state, setState] = createSignal<TValue>(get(), {equals: false});

  const unsubscribe = subscribe((value) => {
    setState(() => value);
  });

  onCleanup(() => unsubscribe());

  return state;
}
