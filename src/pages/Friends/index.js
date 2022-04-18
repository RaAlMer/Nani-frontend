import { client } from "client";
import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Friends() {
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
      const item = await client.get("/auth/friends");
      const result = item.data;
      setFriends(result);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div>
      <h1>Friends</h1>
      <h2>Friend List</h2>
      <div>
        {friends.map(friend => (
          <Link to={`/friendProfile/${friend._id}`}>
          <h3>{friend.username}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
