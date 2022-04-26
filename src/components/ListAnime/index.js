import styles from "./ListAnime.module.scss";
import { AnimeComponent } from "components/AnimeComponent";

export function ListAnime({ anime }) {
  return (
    <div className={styles.list}>
      {anime.map((item) => {
        return (
          <div key={item.id}>
            <AnimeComponent id={item.id} type="tiny" />
          </div>
        );
      })}
    </div>
  );
}
