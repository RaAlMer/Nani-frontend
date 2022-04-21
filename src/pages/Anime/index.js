import styles from "./Anime.module.css";
import { AnimeComponent, AddComment, ListOfComments } from "../../components";
import { useParams } from "react-router-dom";
import { AnimeDropdown } from "components/AnimeDropdown";
import { useEffect, useState } from "react";
import { client } from "client";

export function Anime() {
  const { animeId } = useParams();
  const [comments, setComments] = useState([]);
  
  const getComments = async () => {
    const item = await client.get(`/comments/${animeId}`);
    const result = item.data;
    setComments(result);
  };

  useEffect(() => {
    getComments();
  }, []);


  return (
    <>
      <div>
        <h1>Anime</h1>
        <AnimeComponent id={animeId} type="small" />
        <AnimeDropdown id={animeId} />
        <br />
        <AddComment animeId={animeId} getComments={getComments}/>
        <ListOfComments comments={comments} setComments={setComments}/>
      </div>
    </>
  );
}
