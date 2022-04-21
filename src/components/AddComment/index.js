import { client } from "client";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';

export function AddComment({ animeId, author, getComments }) {
  const [commentInput, setCommentInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleReset = () => {
    setCommentInput("");
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await client.post(
      `/comments/${animeId}`,
      {
        id: uuid(),
        content: commentInput,
        author,
      },
    );
    getComments()
    handleReset()
  };

  
  
  return (
    <form onSubmit={handleSubmit} className="comment">
      <div className="comment__input">
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Comment</button>
      </div>
    </form>
  );
}
