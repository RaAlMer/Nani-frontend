import styles from "./listAnime.module.css";
import { AnimeComponent } from "components/AnimeComponent";

export function ListAnime({ anime }) {
  return <div className={styles.list}>
  {anime.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />
  })}
  </div>
}
