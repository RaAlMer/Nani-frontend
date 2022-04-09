import styles from "./Anime.module.css";
import { AnimeComponent } from "../../components"
import { useParams } from "react-router-dom";

export function Anime() {
  const {animeId} = useParams()
  console.log("🚀 ~ file: index.js ~ line 7 ~ Anime ~ animeId", animeId)
  
  return (
    <div>
      <h1>Anime</h1>
      <AnimeComponent id={animeId}/>
    </div>
  );
}
