import { useContext } from "react";
import { AuthContext } from "../../context";
import styles from "./Home.module.css";

export function Home() {
  const value = useContext(AuthContext)
  return <div>Home: {value.user.email}</div>;
}