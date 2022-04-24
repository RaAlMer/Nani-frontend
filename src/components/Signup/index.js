import styles from "./Signup.module.scss";
import { useState, useContext } from "react";
import { AuthContext } from "context";

export function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = window.location.host;
    signup(username, email, password, confirmPassword, url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="email">Email:</label>
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
        <label htmlFor="password">Password:</label>
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
        <label htmlFor="repeatPassword">Repeat password:</label>
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
        <button className={styles.button}>Sign up</button>
      </div>
      <div className={styles.hr}></div>
    </form>
  );
}
