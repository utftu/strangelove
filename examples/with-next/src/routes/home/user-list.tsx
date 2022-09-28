import {useStrangeLove} from 'strangelove-react';
import MainStore from '../../stores/main-store';

interface Props {
  store: MainStore;
}

function UserList(props: Props) {
  console.log('UserList Component');
  const [users] = useStrangeLove(props.store.atoms.users);

  return (
    <div style={{display: 'flex', gap: 8}}>
      <div>Users:</div>
      {users.map((user, i) => (
        <div key={i}>{user}</div>
      ))}
    </div>
  );
}

export default UserList;
