import { client } from "client";
import { AnimeComponent } from "components/AnimeComponent";
import { AuthContext } from "context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profiles.module.scss";
import { AiFillEdit, AiFillFileImage } from "react-icons/ai";
import { FaTimes, FaPlay } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export function Profiles({ owner, followFriend }) {
  const [edit, setEdit] = useState(false);
  const [newUsername, setUsername] = useState(owner.username);
  const [imageUrl, setImageUrl] = useState();
  const { user, getUser, handleNotification } = useContext(AuthContext);
  const [canSave, setCanSave] = useState(false);

  const handleSave = async () => {
    await client.put(`/auth/profile`, {
      username: newUsername,
      userId: owner._id,
      image: imageUrl,
    });
    await getUser();
    setEdit(false);
    setCanSave(false);
  };

  const handleEditImg = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });
    if (file) {
      setCanSave(false);
      handleFileUpload(file);
    }
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const uploadImage = (file) => {
    return client
      .post(`/auth/upload`, file)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const handleFileUpload = async (image) => {
    const file = new FormData();
    file.append("image", image);
    uploadImage(file)
      .then((response) => {
        setImageUrl(response.path);
        setCanSave(true);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const addWatched = async (animeId) => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/watched`);
      if (item.status === 200) {
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addWatching = async (animeId) => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/watching`);
      if (item.status === 200) {
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addPlanToWatch = async (animeId) => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/planToWatch`);
      if (item.status === 200) {
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromLists = async (animeId) => {
    try {
      const item = await client.get(`/anime/deleteList/${animeId}`);
      if (item.status === 200) {
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const watchedList = owner.watched.map((item) => {
    return (
      <div className={styles.list}>
        <div className={styles.action_btn}>
          <button
            className={styles.addWatching}
            onClick={() => addWatching(item.id)}
          >
            <FaPlay size={20} />
          </button>
          <button
            className={styles.addPlanToWatch}
            onClick={() => addPlanToWatch(item.id)}
          >
            <BiTime size={20} />
          </button>
          <button
            className={styles.delete}
            onClick={() => deleteFromLists(item.id)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <AnimeComponent key={item.id} id={item.id} type="small" />
      </div>
    );
  });
  const watchingList = owner.watching.map((item) => {
    return (
      <div className={styles.list}>
        <div className={styles.action_btn}>
          <button
            className={styles.addWatched}
            onClick={() => addWatched(item.id)}
          >
            <BsCheckLg size={20} />
          </button>
          <button
            className={styles.addPlanToWatch}
            onClick={() => addPlanToWatch(item.id)}
          >
            <BiTime size={20} />
          </button>
          <button
            className={styles.delete}
            onClick={() => deleteFromLists(item.id)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <AnimeComponent key={item.id} id={item.id} type="small" />
      </div>
    );
  });
  const planToWatchList = owner.planToWatch.map((item) => {
    return (
      <div className={styles.list}>
        <div className={styles.action_btn}>
          <button
            className={styles.addWatched}
            onClick={() => addWatched(item.id)}
          >
            <BsCheckLg size={20} />
          </button>
          <button
            className={styles.addWatching}
            onClick={() => addWatching(item.id)}
          >
            <FaPlay size={20} />
          </button>
          <button
            className={styles.delete}
            onClick={() => deleteFromLists(item.id)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <AnimeComponent key={item.id} id={item.id} type="small" />
      </div>
    );
  });

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileDetails}>
        <div className={styles.profileInfo}>
          {edit ? (
            <div className={styles.editProfile}>
              <button onClick={handleEditImg}>
                <AiFillFileImage />
                Upload
              </button>
              <input
                value={newUsername}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setCanSave(true);
                }}
              />
            </div>
          ) : (
            <div className={styles.imageContainer}>
              <img src={owner.image} alt="profilePic" width="100" />
              <h1>{owner.username}</h1>
              {/* If the id from the user is different from the id of the profile, it will show the Follow button */}
              {owner._id !== user._id && (
                <button
                  onClick={() => {
                    followFriend();
                    handleNotification(
                      owner.followers.find((follower) => follower === user._id)
                        ? "unfollowed you"
                        : "followed you",
                      owner._id,
                      `/friendProfile/${user._id}`
                    );
                  }}
                >
                  {owner.followers.find((follower) => follower === user._id)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
            </div>
          )}
          {edit ? (
            <div className={styles.buttonsEd}>
              <button onClick={handleSave} disabled={!canSave}>
                Save
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              {owner._id === user._id && (
                <>
                  <button onClick={handleEdit}>
                    <AiFillEdit />
                  </button>
                  {/* <button onClick={handleDelete}>Delete</button> */}
                </>
              )}
            </div>
          )}
        </div>
        <div className={styles.followCounters}>
          <Link to={`/Follow/${owner._id}`}>
            <h2>Following</h2>
            <p>{owner.following.length}</p>
          </Link>
          <Link to={`/Follow/${owner._id}`}>
            <h2>Followers</h2>
            <p>{owner.followers.length}</p>
          </Link>
        </div>
      </div>
      <div className={styles.profileLists}>
        <label className={styles.actionLabel}>
          <BsCheckLg color="green" /> = "Watched" <FaPlay color="blue" /> =
          "Watching" <BiTime color="orange" /> = "Plan to watch"{" "}
          <FaTimes color="red" /> = "Delete"{" "}
        </label>
      </div>
      <br />
      <input
        id="tab-1"
        type="radio"
        name="tab"
        className={styles.radio_watched}
        defaultChecked
      />
      <label htmlFor="tab-1" className={styles.tab}>
        Watched
      </label>
      <input
        id="tab-2"
        type="radio"
        name="tab"
        className={styles.radio_watching}
      />
      <label htmlFor="tab-2" className={styles.tab}>
        Watching
      </label>
      <input
        id="tab-3"
        type="radio"
        name="tab"
        className={styles.radio_planToWatch}
      />
      <label htmlFor="tab-3" className={styles.tab}>
        Plan to watch
      </label>
      <div className={styles.lists}>
        <div className={styles.lists_watched}>{watchedList}</div>
        <div className={styles.lists_watching}>{watchingList}</div>
        <div className={styles.lists_plan}>{planToWatchList}</div>
      </div>
    </div>
  );
}
