import { client } from "client";
import { ListAnime } from "components/ListAnime";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import styles from "./Home.module.css";

export function Home() {
  const { user } = useContext(AuthContext);
  const [anime, setAnime] = useState([]);

  const getAnime = async () => {
    const item = await client.get(`/anime/home`);
    const result = item.data;
    setAnime(result);
  };
  useEffect(() => {
    getAnime();
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      <div>
        <ListAnime anime={anime} />
      </div>
    </div>
  );
}
