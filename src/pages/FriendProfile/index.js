import { client } from "client";
import { Profiles } from "components/Profiles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function FriendProfile() {
  const { friendId } = useParams();
  const [friend, setFriend] = useState();

  const getFriend = async () => {
    const item = await client.get(`/auth/friendProfile/${friendId}`);
    const result = item.data;
    setFriend(result);
  };

  useEffect(() => {
    getFriend();
  }, []);

  return <>{friend ? <Profiles owner={friend} /> : <div></div>}</>;
}
