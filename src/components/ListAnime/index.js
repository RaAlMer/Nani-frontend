import styles from "./listAnime.module.css";
import { AnimeComponent } from "components/AnimeComponent";
import { useEffect, useState } from "react";

export function ListAnime({ anime }) {
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

  return <div className={styles.list}>

  {anime.map((item) => {
    return <div key={item.id}>{screenWidth > 425 ? (screenWidth > 768 ? (<AnimeComponent id={item.id} type="small"/>) : (<AnimeComponent id={item.id} type="small"/>)) : (<AnimeComponent id={item.id} type="medium"/>)}</div>
  })}
  </div>
}
