import { Comments } from "components/Comments";

export function ListOfComments({ comments, setComments }) {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <Comments
            key={comment._id}
            commentId={comment.id}
            content={comment.content}
            setComments={setComments}
            comment={comment}
          />
        );
      })}
    </div>
  );
}
