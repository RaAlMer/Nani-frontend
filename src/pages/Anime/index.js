import styles from "./Anime.module.css";
import { AnimeComponent } from "../../components"
import { useParams } from "react-router-dom";

export function Anime() {
  const {animeId} = useParams()
  
  return (
    <div>
      <h1>Anime</h1>
      <AnimeComponent id={animeId} type="medium"/>
    </div>
  );
}
