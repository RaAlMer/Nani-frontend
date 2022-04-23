import { client } from "client";
import { Comment } from "components/Comment";
import { CommentForm } from "components";
import { useEffect, useState } from "react";

export function ListOfComments({ currentUserId, animeId }) {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  

  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (commentInput, parentId) => {
    client
      .post(`/comments/${animeId}`, {
        content: commentInput,
        parentId,
      })
      .then((comment) => {
        setBackendComments([comment, ...backendComments]);
        setActiveComment(null);
      });
      getComments();
  };

  const updateComment = (text, commentId) => {
    client.put(`/comments/${commentId}`, {
      content: text,
    }).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, content: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
    getComments();
    getReplies();
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to DELETE this comment?")) {
      client.delete(`/comments/${commentId}`).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
    getComments();
  };

  const getComments = async () => {
    const item = await client.get(`/comments/${animeId}`);
    const result = item.data;
    setBackendComments(result);
  };

  useEffect(() => {
    getComments();
  }, []);
  
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            updateComment={updateComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
}
