import { Alert } from "components";
import { AuthContext } from "context";
import { useContext, useState } from "react";
import styles from "./ResetPass.module.scss";

export function ResetPass() {
  const { resetEmail, sentMail } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = window.location.host;
    resetEmail(email, url);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <div className={styles.group}>
          <label htmlFor="email">Introduce your email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={styles.group}>
          <button className={styles.button}>Reset password</button>
        </div>
        {sentMail && <Alert type="success" message={sentMail} />}
      </form>
    </div>
  );
}
