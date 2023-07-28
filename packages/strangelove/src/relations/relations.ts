import {Atom} from '../atom/atom.ts';

export class Relations {
  static new() {
    return new Relations();
  }

  parents: Set<Atom> = new Set();
  children: Set<Atom> = new Set();
}
