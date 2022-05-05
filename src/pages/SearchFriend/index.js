import { client } from "../../client";
import { useState, useEffect, useContext } from "react";
import styles from "./SearchFriend.module.scss";
import { Link } from "react-router-dom";
import { SearchBar } from "components/SearchBar";
import { AuthContext } from "context";
import { ListAnime } from "components";
import { VscTriangleRight } from "react-icons/vsc";

export function SearchFriend() {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { user } = useContext(AuthContext);
  const [followBtnToggle, setFollowBtnToggle] = useState(false);

  const getFriends = async () => {
    const item = await client.get("/friend");
    const result = item.data;
    setFriends(result);
  };

  const followFriend = async (friendId) => {
    await client.get(`/friend/${friendId}/add`);
    getFriends();
    setFollowBtnToggle(!followBtnToggle);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div>
      <h1>List of users</h1>
      <SearchBar
        search={search}
        setSearch={setSearch}
        setResults={setResults}
        searchBarInput="friend"
        followBtnToggle={followBtnToggle}
      />
      {search !== "" && results.length > 0 ? (
        <div className={styles.searchResults}>
          {results.map((friend) => (
            <div key={friend._id} className={styles.friend}>
                <Link to={`/friendProfile/${friend._id}`}>
                  <img src={friend.image} alt="friend" />
                  <h2>{friend.username}</h2>
                </Link>
                <p
                  className={styles.follow}
                  onClick={() => followFriend(friend._id)}
                >
                  {friend.followers.find((follower) => follower === user._id)
                    ? "Unfollow"
                    : "Follow"}
                </p>
              </div>
          ))}
        </div>
      ) : (
        <div className={styles.friends}>
          {friends.map((friend) => {
            return (
              <div key={friend._id} className={styles.friend}>
                <Link to={`/friendProfile/${friend._id}`}>
                  <img src={friend.image} alt="friend" />
                  <h2>{friend.username}</h2>
                </Link>
                <p
                  className={styles.follow}
                  onClick={() => followFriend(friend._id)}
                >
                  {friend.followers.find((follower) => follower === user._id)
                    ? "Unfollow"
                    : "Follow"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
