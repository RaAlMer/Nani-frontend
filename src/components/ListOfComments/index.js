import { client } from "client";
import { CommentForm, Comment } from "components";
import { useEffect, useState } from "react";
import styles from "./ListOfComments.module.scss";

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

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

  const addComment = async (commentInput, parentId) => {
    await client
      .post(`/comments/${animeId}`, {
        content: commentInput,
        parentId,
      })
      .then((comment) => {
        setBackendComments([comment, ...backendComments]);
        setActiveComment(null);
      });
      await getComments();
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
    Swal.fire({
      title: 'Are you sure you want to DELETE this comment?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete comment',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#c890d1',
    }).then((result) => {
      if (result.isConfirmed) {
        client.delete(`/comments/${commentId}`).then(() => {
          const updatedBackendComments = backendComments.filter(
            (backendComment) => backendComment.id !== commentId
          );
          setBackendComments(updatedBackendComments);
        });
        Swal.fire('Saved!', '', 'success');
      } else {
        Swal.fire('Comment was not deleted', '', 'error')
      }
    })
    getComments();
  };

  const getComments = async () => {
    const item = await client.get(`/comments/${animeId}`);
    const result = item.data;
    setBackendComments(result);
  };

  useEffect(() => {
    getComments();
  }, [animeId]);

  return (
    <div className={styles.comments}>
      <h3 className={styles.comments_title}>Comments</h3>
      <div className={styles.comments_form_title}>Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className={styles.comments_container}>
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
