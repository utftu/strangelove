import {defaultRoot} from 'strangelove-react';
import {AtomSyncRoot, createStateAtomSyncRoot, selectRoot} from 'strangelove';

interface Atoms {
  users: AtomSyncRoot<string[]>;
  comments: AtomSyncRoot<string[]>;
  userComments: AtomSyncRoot<string[]>;
}

class MainStore {
  constructor() {
    const a = selectRoot((get) => {
      const users = get(this.atoms.users);
      const comments = get(this.atoms.comments);

      const b = users.map((user, i) => `${user}: "${comments[i]}"`);
      return b;
    }, defaultRoot);
    this.atoms.userComments = a;
  }
  atoms: Atoms = {
    users: createStateAtomSyncRoot(['Old-user-1', 'Old-user-2'], defaultRoot),
    comments: createStateAtomSyncRoot(
      ['Old-comment-1', 'Old-comment-2'],
      defaultRoot
    ),
    userComments: null as any,
  };
}

export default MainStore;
