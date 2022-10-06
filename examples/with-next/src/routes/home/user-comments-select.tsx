import {useStrangeLoveSelect} from 'strangelove-react';
import MainStore from '../../stores/main-store';

interface Props {
  store: MainStore;
}

function UserCommentSelect(props: Props) {
  console.log('UserCommentSelect Component');
  const [userComments, atom] = useStrangeLoveSelect((get) => {
    const users = get(props.store.atoms.users);
    const comments = get(props.store.atoms.comments);

    return users.map((user, i) => `${user}: "${comments[i]}"`);
  });

  return (
    <div style={{display: 'flex', gap: 8}}>
      <div>UserComments:</div>
      {userComments.map((userComment, i) => (
        <div key={i}>{userComment}</div>
      ))}
    </div>
  );
}

export default UserCommentSelect;
