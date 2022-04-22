import styles from "./Anime.module.css";
import { AnimeComponent, AddComment, ListOfComments } from "../../components";
import { useParams } from "react-router-dom";
import { AnimeDropdown } from "components/AnimeDropdown";
import { useEffect, useState } from "react";
import { client } from "client";
import { Alert } from "../../components";

export function Anime() {
  const { animeId } = useParams();
  const [comments, setComments] = useState([]);
  const [addListStatus, setAddListStatus] = useState(false);
  
  const getComments = async () => {
    const item = await client.get(`/comments/${animeId}`);
    const result = item.data;
    setComments(result);
  };

  const addWatched = async () => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/watched`);
      if (item.status === 200) {
        setAddListStatus(true);
      }
    } catch (error) {
      console.log(error)
    }
  };
  const addWatching = async () => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/watching`);
      if (item.status === 200) {
        setAddListStatus(true);
      }
    } catch (error) {
      console.log(error)
    }
  };
  const addPlanToWatch = async () => {
    try {
      const item = await client.get(`/anime/addList/${animeId}/planToWatch`);
      if (item.status === 200) {
        setAddListStatus(true);
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getComments();
  }, []);


  return (
    <>
      <div>
        <h1>Anime</h1>
        <AnimeComponent id={animeId} type="small" />
        <AnimeDropdown addWatched={addWatched} addWatching={addWatching} addPlanToWatch={addPlanToWatch} />
        {addListStatus && <Alert type="success" message="Added to list" >
          <h3>Successfully added to your List</h3>
        </Alert>}
        <br />
        <AddComment animeId={animeId} getComments={getComments}/>
        <ListOfComments comments={comments} setComments={setComments}/>
      </div>
    </>
  );
}
