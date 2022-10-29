import type {Root, Atom} from 'strangelove';
import {AtomAsyncRoot} from 'strangelove';

export function useStrangeLoveSelect<TValue>(
  cb: (get: <TValue>(atom: Atom<TValue>) => TValue) => TValue,
  customRoot?: Root
): [
  TValue,
  TValue extends Promise<infer Item>
    ? AtomAsyncRoot<Item>
    : AtomAsyncRoot<TValue>
];
