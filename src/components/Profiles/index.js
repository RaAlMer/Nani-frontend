import { client } from "client";
import { AnimeComponent } from "components/AnimeComponent";
import { AuthContext } from "context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export function Profiles({ owner, followFriend }) {
  const [edit, setEdit] = useState(false);
  const [newUsername, setUsername] = useState(owner.username);
  const [imageUrl, setImageUrl] = useState();
  const { user, getUser } = useContext(AuthContext);

  const handleSave = async () => {
    await client.put(`/auth/profile`, {
      username: newUsername,
      userId: owner._id,
      image: imageUrl,
    });
    await getUser();
    setEdit(false);
  };

  const handleEditImg = async () => {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })
    if (file) {
      handleFileUpload(file);
    }
  }

  const handleEdit = () => {
    setEdit(true);
  }

  const handleCancel = () => {
    setEdit(false);
  };

  const uploadImage = (file) => {
    return client.post(`/auth/upload`, file)
      .then(res => res.data)
      .catch((err) => console.log(err))
  }

  const handleFileUpload = async (image) => {
    const file = new FormData()
    file.append("image", image)
    console.log(...file)
    uploadImage(file)
      .then(response => setImageUrl(response.path))
      .catch(err => console.log("Error while uploading the file: ", err))
  }

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
          {owner._id === user._id && (
            <>
              <button onClick={handleEdit}>Edit</button>
              {/* <button onClick={handleDelete}>Delete</button> */}
            </>
          )}
        </div>
      )}
      {edit ? (
        <div className={styles.editProfile}>
          <button onClick={handleEditImg}>Edit user image</button>
          <input
            value={newUsername}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
      ) : (
        <div>
          <img src={owner.image} alt="profilePic" width="100"/>
          <h1>{owner.username}</h1>
          {/* If the id from the user is different from the id of the profile, it will show the Follow button */}
          {owner._id !== user._id && (
            <button onClick={followFriend}>
              {owner.followers.find((follower) => follower === user._id) ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      )}
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
