import { client } from "client";
import { ListAnime, Spinner } from "components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import styles from "./Home.module.css";

export function Home() {
  const { user } = useContext(AuthContext);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAnime = async () => {
    const item = await client.get(`/anime/home`);
    const result = item.data;
    setAnime(result);
    setLoading(false);
  };

  useEffect(() => {
    getAnime();
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <ListAnime anime={anime} />
        )}
      </div>
    </div>
  );
}
