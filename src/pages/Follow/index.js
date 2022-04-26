import { client } from "client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Follow.module.scss";

export function Follow() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { id } = useParams();

  const getFriends = async () => {
    const item = await client.get(`/friend/${id}`);
    const result = item.data;
    setFollowers(result.followers);
    setFollowing(result.following);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div>
      <h1>Follow List</h1>
      <h2>Following</h2>
      <div>
        {following.map((friend) => (
          <Link to={`/friendProfile/${friend._id}`}>
            <h3>{friend.username}</h3>
          </Link>
        ))}
      </div>
      <h2>Followers</h2>
      <div>
        {followers.map((friend) => (
          <Link to={`/friendProfile/${friend._id}`}>
            <h3>{friend.username}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
