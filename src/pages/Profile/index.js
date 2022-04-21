import { client } from "client";
import { Profiles } from "components/Profiles";
import { useEffect, useState } from "react";
import styles from "./Profile.module.css";

export function Profile() {
  const [user, setUser] = useState();

  const getUser = async () => {
    const item = await client.get("/auth/profile");
    const result = item.data;
    setUser(result);
  };

  useEffect(() => {
    getUser();
  }, []);

  return <>{user && <Profiles owner={user} setUser={setUser}/>}</>
}
