import { Profiles } from "components/Profiles";
import { AuthContext } from "../../context";
import { useContext } from "react";
import styles from "./Profile.module.scss";

export function Profile() {
  const { user, getUser } = useContext(AuthContext);
  getUser();

  return <>{user && <Profiles owner={user} />}</>
}
