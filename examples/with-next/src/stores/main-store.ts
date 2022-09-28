import {defaultRoot} from 'strangelove-react';
import {SyncUserAtom} from 'strangelove/types/user-atom';

interface Atoms {
  users: SyncUserAtom<string[]>;
  comments: SyncUserAtom<string[]>;
  userComments: SyncUserAtom<string[]>;
}

class MainStore {
  constructor() {
    this.atoms.userComments = defaultRoot.select(({get}) => {
      const users = get(this.atoms.users);
      const comments = get(this.atoms.comments);

      return users.map((user, i) => `${user}: "${comments[i]}"`);
    }) as SyncUserAtom<string[]>;
  }
  atoms: Atoms = {
    users: defaultRoot.createSyncStateAtom(['aleksey', 'denis']),
    comments: defaultRoot.createSyncStateAtom(['comment1', 'comment2']),
    userComments: null as any,
  };
}

export default MainStore;
