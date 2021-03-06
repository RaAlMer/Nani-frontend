import styles from "./ListAnime.module.scss";
import { AnimeComponent } from "components/AnimeComponent";
import { useEffect, useState } from "react";

export function ListAnime({ anime, type }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <div className={styles.list}>
      {anime.map((item) => {
        return (
          <div key={item.id} className={styles.listItem}>
            {screenWidth > 320 ? (
              screenWidth > 768 ? (
                <AnimeComponent id={item.id} type={type} />
              ) : (
                <AnimeComponent id={item.id} type={type} />
              )
            ) : (
              <AnimeComponent id={item.id} type="medium" />
            )}
          </div>
        );
      })}
    </div>
  );
}
