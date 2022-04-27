import styles from "./Anime.module.scss";
import { AnimeComponent, ListOfComments, CommentForm } from "../../components";
import { useParams } from "react-router-dom";
import { AnimeDropdown } from "components/AnimeDropdown";
import { useContext, useEffect, useState } from "react";
import { client } from "client";
import { Alert } from "../../components";
import { AuthContext } from "context";

export function Anime() {
  const { user } = useContext(AuthContext);
  const { animeId } = useParams();
  const [addListStatus, setAddListStatus] = useState(false);

  const addWatched = async () => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/watched`);
      if (item.status === 200) {
        setAddListStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addWatching = async () => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/watching`);
      if (item.status === 200) {
        setAddListStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addPlanToWatch = async () => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/planToWatch`);
      if (item.status === 200) {
        setAddListStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Anime</h1>
        <AnimeComponent id={animeId} type="large" />
        <AnimeDropdown
          addWatched={addWatched}
          addWatching={addWatching}
          addPlanToWatch={addPlanToWatch}
        />
        {addListStatus && (
          <Alert type="success" message="Added to list">
            <h3>Successfully added to your List</h3>
          </Alert>
        )}
        <br />
        <ListOfComments
          currentUserId={user ? user._id : null}
          animeId={animeId}
        />
      </div>
    </>
  );
}
