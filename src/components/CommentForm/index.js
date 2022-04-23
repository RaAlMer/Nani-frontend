import { useState } from "react";

export function CommentForm({
  submitLabel,
  handleSubmit,
  initialText = "",
  hasCancelButton = false,
  handleCancel,
}) {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text, null);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button
        className="comment-form-button"
        type="submit"
        disabled={isTextareaDisabled}
      >
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
