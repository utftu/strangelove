import type {NextPage} from 'next';
import {defaultRoot, StrangeLoveProvider} from 'strangelove-react';
import {useMemo} from 'react';
import MainStore from '../../stores/main-store';
import UserList from './user-list';
import UserComments from './user-comments';
import CommentList from './comment-list';

const Home: NextPage = () => {
  const store = useMemo(() => {
    const users = new MainStore();
    users.atoms.users.listeners.subscribe(() => {
      console.log('-----', 'update');
    });
    return users;
  }, []);
  // @ts-ignore
  globalThis.store = store;
  return (
    <StrangeLoveProvider value={defaultRoot}>
      <div>
        <UserList store={store} />
        <CommentList store={store} />
        <UserComments store={store} />
      </div>
    </StrangeLoveProvider>
  );
};

export default Home;
