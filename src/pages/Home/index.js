import { client } from "client";
import { AnimeComponent, ListAnime, Spinner } from "components";
import { useContext, useEffect, useState, Suspense } from "react";
import { AuthContext } from "../../context";
import styles from "./Home.module.scss";

export function Home() {
  const { user, getUser } = useContext(AuthContext);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const getAnime = async () => {
    const item = await client.get(`/anime/home`);
    const result = item.data;
    setAnime(result);
    setLoading(false);
  };

  useEffect(() => {
    getAnime();
    getUser();
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <div>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.container}>
              {user?.watching.length > 0 && (
                <div className={styles.listContainer}>
                  <h1>Watching</h1>
                  <div className={styles.list}><ListAnime anime={user?.watching} type="medium" /></div>
                </div>
              )}
              {(screenWidth > 375 || user?.watching.length === 0) && (
                <div className={styles.trending}>
                  <h1>Trending</h1>
                    <div className={styles.list}><ListAnime anime={anime} type="tiny" /></div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
