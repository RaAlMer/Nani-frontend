import { client } from "client";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Footer, ListAnime, Navbar, Spinner } from "./components";

function App() {
  const [animeLeft, setAnimeLeft] = useState([]);
  const [animeRight, setAnimeRight] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAnime = async () => {
    const item = await client.get(`/anime/popular`);
    const result = item.data;
    setAnimeLeft(result.slice(0, 4));
    setAnimeRight(result.slice(4, 8));
    setLoading(false);
  };

  useEffect(() => {
    getAnime();
  }, []);

  return (
    <>
      <div className={styles.app}>
        <div className={styles.bar}>
          {loading ? (
            <Spinner />
          ) : (
            <ListAnime anime={animeLeft} type="medium" />
          )}
        </div>
        <div className={styles.app__container}>
          <Navbar />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
        <div className={styles.bar}>
          {loading ? (
            <Spinner />
          ) : (
            <ListAnime anime={animeRight} type="medium" />
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}

export default App;
