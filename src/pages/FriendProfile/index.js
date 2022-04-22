import { client } from "client";
import { Profiles } from "components/Profiles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    console.log(result);
  }

  useEffect(() => {
    getFriend();
  }, []);

  return <>{friend ? <Profiles owner={friend} followFriend={followFriend}/> : <div></div>}</>;
}
