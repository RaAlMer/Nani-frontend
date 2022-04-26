import { client } from "client";
import { Profiles } from "components/Profiles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./FriendProfile.module.scss";

export function FriendProfile() {
  const { friendId } = useParams();
  const [friend, setFriend] = useState();

  const getFriend = async () => {
    const item = await client.get(`/friend/friendProfile/${friendId}`);
    const result = item.data;
    setFriend(result);
  };

  const followFriend = async () => {
    const item = await client.get(`/friend/${friendId}/add`);
    const result = item.data;
    getFriend();
  }

  useEffect(() => {
    getFriend();
  }, []);

  return <>{friend ? <Profiles owner={friend} followFriend={followFriend}/> : <div></div>}</>;
}
