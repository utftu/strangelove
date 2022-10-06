import {defaultRoot} from 'strangelove-react';
import {SyncUserAtom} from 'strangelove/types/user-atom';

interface Atoms {
  users: SyncUserAtom<string[]>;
  comments: SyncUserAtom<string[]>;
  userComments: SyncUserAtom<string[]>;
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
    users: defaultRoot.createSyncStateAtom(['Old-user-1', 'Old-user-2']),
    comments: defaultRoot.createSyncStateAtom([
      'Old-comment-1',
      'Old-comment-2',
    ]),
    userComments: null as any,
  };
}

export default MainStore;
