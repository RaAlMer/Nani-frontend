import { client } from "client";
import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Friends() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const getFriends = async () => {
      const item = await client.get("/friend");
      const result = item.data;
      setFollowers(result.followers);
      setFollowing(result.following);
  };

  useEffect(() => {
    getFriends();
  }, []);
  
  return (
    <div>
      <h1>Friends</h1>
      <h2>Following</h2>
      <div>
        {following.map(friend => (
          <Link to={`/friendProfile/${friend._id}`}>
          <h3>{friend.username}</h3>
          </Link>
        ))}
      </div>
      <h2>Followers</h2>
      <div>
        {followers.map(friend => (
          <Link to={`/friendProfile/${friend._id}`}>
          <h3>{friend.username}</h3>
          </Link>        
        ))}
      </div>
    </div>
  );
}
