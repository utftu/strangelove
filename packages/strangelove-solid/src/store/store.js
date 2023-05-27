import {createSignal, onCleanup} from 'solid-js';

export function createStore(get, subscribe) {
  const [state, setState] = createSignal(get(), {equals: false});

  const unsubscribe = subscribe((value) => {
    setState(value);
  });

  onCleanup(() => unsubscribe());

  return state;
}
