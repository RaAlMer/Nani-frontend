import { Profiles } from "components/Profiles";
import { AuthContext } from "../../context";
import { useContext } from "react";
import styles from "./Profile.module.scss";

export function Profile() {
  const { user } = useContext(AuthContext);

  return <>{user && <Profiles owner={user} />}</>
}
