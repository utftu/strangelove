import type {Atom, Root} from 'strangelove';

export type UseStrangeLove = (...args: (Atom | Root)[]) => any[];

// export function useStrangeLove<T1 extends Atom>(atom: T1): T1['value']['value'];
// export function useStrangeLove<T1 extends Atom, T2 extends Atom>(
//   atom1: T1,
//   atom2: T2
// ): [T1['value']['value'], T2['value']['value']];
// export function useStrangeLove<
//   T1 extends Atom,
//   T2 extends Atom,
//   T3 extends Atom
// >(
//   atom1: T1,
//   atom2: T2,
//   atom3: T3
// ): [T1['value']['value'], T2['value']['value'], T3['value']['value']];
// export function useStrangeLove(...args: (Atom | Root)[]): any[];
