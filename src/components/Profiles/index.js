import { client } from "client";
import { AnimeComponent } from "components/AnimeComponent";
import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";

export function Profiles({ owner, setUser, followFriend }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [edit, setEdit] = useState(false);
  const [newUsername, setUsername] = useState(owner.username);
  const [imageUrl, setImageUrl] = useState("");
  const userContext = useContext(AuthContext);
  const [unFollow, setUnFollow] = useState(false);

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

  const handleFileUpload = async (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    console.log(...uploadData);
    const item = await client.put("/auth/profile", {
      uploadData,
    });
    const result = item.data;
    setImageUrl(result);
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

  const handleFollowUnfollow = () => {
    let followFr = followers.some((follow) => {
      if (follow._id === userContext.user._id) {
        return true;
      }
    })
    if (followFr) {
      setUnFollow(true);
    } else {
      setUnFollow(false);
    }
  }

  useEffect(() => {
    getFriends();
    handleFollowUnfollow();
  }, [following]);

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
        <div>
          <input type="file" onChange={(e) => handleFileUpload(e)} />
          <input
            value={newUsername}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
      ) : (
        <div>
          <img src={owner.imageUrl} alt="profilePic" />
          <h1>{owner.username}</h1>
          {/* If the id from the user is different from the id of the profile, it will show the Follow button */}
          {owner._id !== userContext.user._id && (
            <button onClick={followFriend}>
              {unFollow ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
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
