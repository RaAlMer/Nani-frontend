import styles from "./Signup.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "context";

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
      <h2>Signup</h2>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button>Signup</button>
    </form>
  );
}