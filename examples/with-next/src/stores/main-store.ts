import {defaultRoot} from 'strangelove-react';
import {AtomRootSync} from 'strangelove';

interface Atoms {
  users: AtomRootSync<string[]>;
  comments: AtomRootSync<string[]>;
  userComments: AtomRootSync<string[]>;
}

class MainStore {
  constructor() {
    const a = defaultRoot.select((get) => {
      const users = get(this.atoms.users);
      const comments = get(this.atoms.comments);

      const b = users.map((user, i) => `${user}: "${comments[i]}"`);
      return b;
    });
    this.atoms.userComments = a;
  }
  atoms: Atoms = {
    users: defaultRoot.createStateAtomSync(['Old-user-1', 'Old-user-2']),
    comments: defaultRoot.createStateAtomSync([
      'Old-comment-1',
      'Old-comment-2',
    ]),
    userComments: null as any,
  };
}

export default MainStore;
