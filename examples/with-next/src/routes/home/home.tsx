import type {NextPage} from 'next';
import {defaultRoot, StrangeLoveProvider} from 'strangelove-react';
import {useMemo} from 'react';
import MainStore from '../../stores/main-store';
import UserList from './user-list';
import UserComments from './user-comments';
import CommentList from './comment-list';

const Home: NextPage = () => {
  const store = useMemo(() => {
    return new MainStore();
  }, []);
  // @ts-ignore
  globalThis.store = store;
  return (
    <StrangeLoveProvider value={defaultRoot}>
      <div>
        <UserList store={store} />
        <CommentList store={store} />
        <UserComments store={store} />
        <button
          onClick={() => store.atoms.users.set(['New-user-1', 'New-user-2'])}
        >
          New Users
        </button>
        <button
          onClick={() =>
            store.atoms.comments.set(['New-comment-1', 'New-comment-2'])
          }
        >
          New Comments
        </button>
      </div>
    </StrangeLoveProvider>
  );
};

export default Home;
