import styles from "./Login.module.scss";
import { useState, useContext } from "react";
import { AuthContext } from "context";

export function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label htmlFor="email">Email:</label>
        <input
          id="emailLogin"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="password">Password:</label>
        <input
          id="passwordLogin"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className={styles.group}>
        <button className={styles.button}>Log In</button>
      </div>
      <div className={styles.hr}></div>
      <div className={styles.foot_lnk}>
        <a href="#">Forgot Password?</a>
      </div>
    </form>
  );
}
