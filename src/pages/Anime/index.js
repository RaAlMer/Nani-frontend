import styles from "./Anime.module.scss";
import { AnimeComponent, ListOfComments } from "../../components";
import { useParams } from "react-router-dom";
import { AnimeDropdown } from "components/AnimeDropdown";
import { useContext, useEffect, useState } from "react";
import { client } from "client";
import { Alert } from "../../components";
import { AuthContext } from "context";

export function Anime() {
  const { user, getUser } = useContext(AuthContext);
  const { animeId } = useParams();
  const [addListStatus, setAddListStatus] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timeout;
    if (showAlert) {
      timeout = setTimeout(() => setShowAlert(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [showAlert]);

  const addWatched = async () => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/watched`);
      if (item.status === 200) {
        getUser();
      }
      setAddListStatus(item.data);
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };
  const addWatching = async () => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/watching`);
      if (item.status === 200) {
        getUser();
      }
      setAddListStatus(item.data);
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };
  const addPlanToWatch = async () => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/planToWatch`);
      if (item.status === 200) {
        getUser();
      }
      setAddListStatus(item.data);
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className={styles.container}>
          <AnimeComponent id={animeId} type="large" />
          <AnimeDropdown
            addWatched={addWatched}
            addWatching={addWatching}
            addPlanToWatch={addPlanToWatch}
          />
          <div className={styles.alert}>
            {showAlert &&
              (addListStatus ? (
                <Alert type="warning" message="Added to list">
                  <h3>Already in this list</h3>
                </Alert>
              ) : (
                <Alert type="success" message="Added to list">
                  <h3>Successfully added to your List</h3>
                </Alert>
              ))}
          </div>
        </div>
        <br />
        <ListOfComments
          currentUserId={user ? user._id : null}
          animeId={animeId}
        />
      </div>
    </>
  );
}
