import {useStrangeLove} from 'strangelove-react';
import MainStore from '../../stores/main-store';

interface Props {
  store: MainStore;
}

function UserList(props: Props) {
  console.log('UserComments Component');
  const [userComment] = useStrangeLove(props.store.atoms.userComments);

  return (
    <div style={{display: 'flex', gap: 8}}>
      <div>UserComments:</div>
      {userComment.map((userComment, i) => (
        <div key={i}>{userComment}</div>
      ))}
    </div>
  );
}

export default UserList;
