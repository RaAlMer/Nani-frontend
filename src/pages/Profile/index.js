import { Profiles } from "components/Profiles";
import { AuthContext } from "../../context";
import { useContext, useEffect } from "react";
import styles from "./Profile.module.css";

export function Profile() {
  const { user } = useContext(AuthContext);

  return <>{user && <Profiles owner={user} />}</>
}
