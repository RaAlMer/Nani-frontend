import { Alert } from "components";
import { AuthContext } from "context";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ResetPassToken.module.scss";

export function ResetPassToken() {
  const { resetPass, sentMail } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPass(password, confirmPassword, id, token);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <div className={styles.group}>
          <label htmlFor="password">Introduce your new password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="repeatPassword">Repeat your new password:</label>
          <input
            id="repeatPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.group}>
          <button className={styles.button}>Submit</button>
        </div>
        {sentMail && <Alert type="success" message={sentMail} />}
      </form>
    </div>
  );
}
