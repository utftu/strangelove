import {useStrangeLove} from 'strangelove-react';
import MainStore from '../../stores/main-store';

interface Props {
  store: MainStore;
}

function CommentList(props: Props) {
  console.log('CommentList Component');
  const [comments] = useStrangeLove(props.store.atoms.comments);

  return (
    <div style={{display: 'flex', gap: 8}}>
      <div>UserComments:</div>
      {comments.map((comment, i) => (
        <div key={i}>{comment}</div>
      ))}
    </div>
  );
}

export default CommentList;
