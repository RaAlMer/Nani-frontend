import { useState } from "react";
import styles from "./CommentForm.module.scss";

// Component to generate the body of a comment
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
        className={styles.comment_form_textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button
        className={styles.comment_form_button}
        type="submit"
        disabled={isTextareaDisabled}
      >
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className={`${styles.comment_form_button} ${styles.comment_form_cancel_button}`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
