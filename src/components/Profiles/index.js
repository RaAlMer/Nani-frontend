import { client } from "client";
import { AnimeComponent } from "components/AnimeComponent";
import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";

export function Profiles({ owner, setUser }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [edit, setEdit] = useState(false);
  const [newUsername, setNewUsername] = useState(owner.username);
  const userContext = useContext(AuthContext);

  const getFriends = async () => {
    const item = await client.get(`/friend/${owner._id}`);
    const result = item.data;
    setFollowers(result.followers);
    setFollowing(result.following);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleSave = () => {
    setUser({
      ...owner,
      username: newUsername,
    });
    client.put(`/auth/profile`, {
      username: newUsername,
      userId: owner._id,
    });
    handleCancel();
  };

  useEffect(() => {
    getFriends();
  }, []);

  const watchedList = owner.watched.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />;
  });
  const watchingList = owner.watching.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />;
  });
  const planToWatchList = owner.planToWatch.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />;
  });

  return (
    <div>
      {edit ? (
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          {owner._id === userContext.user._id && (
            <>
              <button onClick={handleEdit}>Edit</button>
              {/* <button onClick={handleDelete}>Delete</button> */}
            </>
          )}
        </div>
      )}
      {edit ? (
        <input
          value={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
        />
      ) : (
        <h1>{owner.username}</h1>
      )}
      <div className={styles.followCounters}>
        <Link to={`/Follow/${owner._id}`}>
          <h2>Following</h2>
          <p>{following.length}</p>
        </Link>
        <Link to={`/Follow/${owner._id}`}>
          <h2>Followers</h2>
          <p>{followers.length}</p>
        </Link>
      </div>
      <br />
      <ul className={styles.lists}>
        <li>
          <p>Watched</p>
        </li>
        <ul className={styles.lists}>{watchedList}</ul>
        <li>
          <p>Watching</p>
        </li>
        <ul className={styles.lists}>{watchingList}</ul>
        <li>
          <p>Plan To Watch</p>
        </li>
        <ul className={styles.lists}>{planToWatchList}</ul>
      </ul>
    </div>
  );
}
