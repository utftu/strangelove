import type {
  Root,
  Atom,
  AtomRootAsync,
  AtomRootSync,
  SelectRootConfig,
} from 'strangelove';

export function useStrangeLoveSelect<TValue>(
  cb: (
    helpers: <TValue>(atom: Atom<TValue>) => TValue,
    config: SelectRootConfig<TValue>
  ) => TValue,
  customRoot?: Root
): [
  TValue,
  TValue extends Promise<any> ? AtomRootAsync<TValue> : AtomRootSync<TValue>
];
