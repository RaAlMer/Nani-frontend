import { CommentForm } from "components";
import { AuthContext } from "context";
import { useContext, useState } from "react";
import styles from "./Comment.module.scss";

export function Comment({
  comment,
  replies,
  currentUserId,
  deleteComment,
  updateComment,
  activeComment,
  addComment,
  setActiveComment,
  parentId = null,
}) {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.author._id && !timePassed;
  const canDelete =
    currentUserId === comment.author._id && replies.length === 0 && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const [isEdited, setIsEdited] = useState(false);
  const { user, handleNotification } = useContext(AuthContext);

  return (
    <div key={comment.id} className={styles.comment}>
      <div className={styles.comment_image_container}>
        <img src={comment.author.image} alt="#" width="40" />
      </div>
      <div className={styles.comment_right_part}>
        <div className={styles.comment_content}>
          <div className={styles.comment_author}>{comment.author.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && (
          <div className={styles.comment_text}>{comment.content}</div>
        )}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.content}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className={styles.comment_actions}>
          {canReply && (
            <div
              className={styles.comment_action}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className={styles.comment_action}
              onClick={() => {
                setActiveComment({ id: comment.id, type: "editing" });
                setIsEdited(true);
              }}
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className={styles.comment_action}
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
          {isEdited && <p>{"(edited)"}</p>}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => {
              addComment(text, replyId);
              comment.author._id !== user._id &&
                handleNotification(
                  "replied to your comment",
                  comment.author._id,
                  window.location.pathname
                );
            }}
          />
        )}
        {replies.length > 0 && (
          <div className={styles.replies}>
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                updateComment={updateComment}
                addComment={addComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                parentId={comment.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
