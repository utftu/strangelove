import {Atom} from '../atom/atom.ts';

export class Relations {
  parents: Set<Atom> = new Set();
  children: Set<Atom> = new Set();
}
