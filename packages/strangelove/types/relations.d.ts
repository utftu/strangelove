import Atom from './atom';

export class Relations {
  static connect(parent: Atom, child: Atom);
  static disconnect(parent: Atom, child: Atom);
  atom: Atom;
  constructor(atom: Atom);
  replaceParents(parents: Set<Atom>);
  replaceChildren(children: Set<Atom>);
}

export default Relations;
