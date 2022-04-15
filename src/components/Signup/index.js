import styles from "./Signup.module.scss";
import { useState, useContext } from "react";
import { AuthContext } from "context";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";

export function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, email, password);
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
        <button className={styles.button}>Sign Up</button>
      </div>
      <div className={styles.hr}></div>
      <ul className={styles.wrapper}>
        <li className={`${styles.icon} ${styles.facebook}`}>
          <span className={styles.tooltip}>Facebook</span>
          <span>
            <FaFacebookF />
          </span>
        </li>
        <li className={`${styles.icon} ${styles.twitter}`}>
          <span className={styles.tooltip}>Twitter</span>
          <span>
            <FaTwitter />
          </span>
        </li>
        <li className={`${styles.icon} ${styles.instagram}`}>
          <span className={styles.tooltip}>Instagram</span>
          <span>
            <FaInstagram />
          </span>
        </li>
        <li className={`${styles.icon} ${styles.github}`}>
          <span className={styles.tooltip}>Github</span>
          <span>
            <FaGithub />
          </span>
        </li>
        <li className={`${styles.icon} ${styles.youtube}`}>
          <span className={styles.tooltip}>Youtube</span>
          <span>
            <FaYoutube />
          </span>
        </li>
      </ul>
    </form>
  );
}
