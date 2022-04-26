import styles from "./Anime.module.css";
import { client } from "../../client";
import { useEffect, useState } from "react";
import { Spinner } from "components";
import { Link } from "react-router-dom";

export function AnimeComponent({ id, type }) {
  const [anime, setAnime] = useState({
    id: "",
    type: "",
    links: {},
    attributes: {},
    relationships: {},
  });
  const [loading, setLoading] = useState(true);

  const getAnime = async () => {
    const item = await client.get(`/anime/${id}`);
    const result = item.data;
    setAnime(result);
    setLoading(false);
  };

  useEffect(() => {
    getAnime();
  }, []);

  const animeMainInfo = (
    <>
      <div className={styles.container}>
        <br />
        <div className={styles.anime}>
          <Link to={`/anime/${anime.id}`} className={styles.anime_Link}>
          <img
            src={`https://media.kitsu.io/anime/poster_images/${anime.id}/${type}.jpg`}
            alt=""
          />
          <h1 id="title">{anime.attributes.canonicalTitle}</h1>
          </Link>
        </div>
      </div>
    </>
  );
  const animeExtraInfo = (
    <>
      <ul>
        <li>
          <div className="rating">
            <h2 id="averageRatingLabel">Average Rating</h2>
            <h2 id="averageRating">{anime.attributes.averageRating}</h2>
          </div>
        </li>
        <li>
          <div className="animeDetails">
            <p id="subtype">{anime.attributes.subtype}</p>
            <p id="status">{anime.attributes.status}</p>
            <p id="ageRating">Rated: {anime.attributes.ageRating}</p>
            <p id="episodeCount">Episodes: {anime.attributes.episodeCount}</p>
          </div>
        </li>
      </ul>

      <h2 id="synopsisLabel">Synopsis</h2>
      <h3 id="synopsis">{anime.attributes.synopsis}</h3>
    </>
  );
  const handleRender = () => {
    if (loading) {
      <Spinner />;
    } else if (type === "medium" || type === "small") {
      return animeMainInfo;
    } else {
      return [animeMainInfo, animeExtraInfo];
    }
  };
  return <>{handleRender()}</>;
}
