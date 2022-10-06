import type {Atom, Root} from 'strangelove';

export function useStrangeLove<T1>(atom: Atom<T1>): [T1, Atom<void>];
export function useStrangeLove<T1, T2>(
  atom: Atom<T1>,
  atom2: Atom<T2>
): [T1, T2, Atom<void>];
export function useStrangeLove<T1, T2, T3>(
  atom: Atom<T1>,
  atom2: Atom<T2>,
  atom3: Atom<T3>
): [T1, T2, T3, Atom<void>];
export function useStrangeLove<T1, T2, T3, T4>(
  atom: Atom<T1>,
  atom2: Atom<T2>,
  atom3: Atom<T3>,
  atom4: Atom<T4>
): [T1, T2, T3, T4, Atom<void>];
export function useStrangeLove<T1, T2, T3, T4, T5>(
  atom: Atom<T1>,
  atom2: Atom<T2>,
  atom3: Atom<T3>,
  atom4: Atom<T4>,
  atom5: Atom<T5>
): [T1, T2, T3, T4, T5, Atom<void>];
export function useStrangeLove<T1, T2, T3, T4, T5>(
  entries: (Atom | Root)[]
): any[];
