import { client } from "client";
import { AnimeComponent } from "components";
import { Profiles } from "components/Profiles";
import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";

export function Profile() {
  const [user, setUser] = useState();

  const getUser = async () => {
    const item = await client.get("/auth/profile");
    const result = item.data;
    setUser(result);
    console.log(result);
  };

  useEffect(() => {
    getUser();
  }, []);

  return <>{user && <Profiles owner={user} />}</>
}
