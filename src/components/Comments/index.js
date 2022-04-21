import { client } from "client";
import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
import styles from "./comments.module.scss";

export function Comments({ commentId, content, setComments, comment }) {
  const [showAll, setShowAll] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState(content);
  const userContext = useContext(AuthContext);

  const handleDelete = () => {
    setComments((prevComments) => {
      return prevComments.filter((comment) => {
        return comment.id !== commentId;
      });
    });
    const response = client.delete(`/comments/${commentId}`);
  };

  const handleShowAll = () => {
    setShowAll((prevValue) => {
      return !prevValue;
    });
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleSave = () => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            id: comment.id,
            content: newCommentContent,
            author: comment.author,
          };
        } else {
          return comment;
        }
      });
    });
    const response = client.put(`/comments/${commentId}`, {
      content: newCommentContent,
    });
    handleCancel();
  };

  return (
    <div className={styles.comments} key={comment.id}>
      <div className="comment__input">
        <div className="username">{`${comment.author.username}`}</div>
        {edit ? (
          <textarea
            value={newCommentContent}
            onChange={(event) => setNewCommentContent(event.target.value)}
          />
        ) : showAll ? (
          <p>{content}</p>
        ) : (
          <p>
            {content.length > 100 ? `${content.substring(0, 100)}...` : content}
          </p>
        )}

        {edit ? (
          <div className="tweet__actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div className="tweet__actions">
            {comment.author.username === userContext.user.username && (
              <>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
            {content.length > 100 && (
              <button onClick={handleShowAll}>
                {showAll ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
