import styles from "./Anime.module.css";
import { AnimeComponent } from "../../components"
import { useParams } from "react-router-dom";
import { AnimeDropdown } from "components/AnimeDropdown";

export function Anime() {
  const {animeId} = useParams()
  
  return (
    <div>
      <h1>Anime</h1>
      <AnimeComponent id={animeId} type="small"/>
      <AnimeDropdown id={animeId}/>
    </div>
  );
}
