import styles from "./Anime.module.scss";
import { client } from "../../client";
import { useEffect, useState } from "react";
import { Spinner } from "components";
import { Link } from "react-router-dom";
import cn from "classnames";

// Component to display an anime
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
  };

  useEffect(() => {
    getAnime();
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [id]);

  // Main info of the anime
  const animeMainInfo = (
    <>
      <div className={styles.container}>
        <div
          className={cn({
            [styles.anime_tiny]: type === "tiny",
            [styles.anime_small]: type === "small",
            [styles.anime_medium]: type === "medium",
            [styles.anime_large]: type === "large",
          })}
        >
          <Link to={`/anime/${anime.id}`} className={styles.anime_Link}>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <img
                  className={cn({
                    [styles.anime_img_tiny]: type === "tiny",
                    [styles.anime_img_small]: type === "small",
                    [styles.anime_img_medium]: type === "medium",
                    [styles.anime_img_large]: type === "large",
                  })}
                  src={`https://media.kitsu.io/anime/poster_images/${anime.id}/${type}.jpg`}
                  alt=""
                />
                <div className={styles.info}>
                  <h3 id="title">{anime.attributes.canonicalTitle}</h3>
                  <p>Episodes {anime.attributes.episodeCount}</p>
                </div>
              </>
            )}
          </Link>
        </div>
      </div>
    </>
  );
  // Displays the whole information of the anime
  const animeLarge = (
    <div className={styles.main}>
      <h1 id="title">{anime.attributes.canonicalTitle}</h1>
      <div className={styles.container}>
        <div className={styles.anime_large}>
          <img
            className={styles.anime_img_large}
            src={`https://media.kitsu.io/anime/poster_images/${anime.id}/large.jpg`}
            alt=""
          />
        </div>
        <div className={styles.synopsis}>
          <ul>
            <li>
              <div className="rating">
                <p id="averageRatingLabel">Average Rating</p>
                <h2 id="averageRating">{anime.attributes.averageRating}</h2>
              </div>
            </li>
            <li className={styles.animeDetails}>
              <p id="subtype">{anime.attributes.subtype}</p>
              <p id="status">{anime.attributes.status}</p>
              <p id="ageRating">Rated: {anime.attributes.ageRating}</p>
              <p id="episodeCount">Episodes: {anime.attributes.episodeCount}</p>
            </li>
          </ul>
          <h2 id="synopsisLabel">Synopsis</h2>
          <h3 id="synopsis">{anime.attributes.synopsis}</h3>
        </div>
      </div>
    </div>
  );
  const handleRender = () => {
    if (type === "medium" || type === "small" || type === "tiny") {
      return animeMainInfo;
    } else if (type === "large") {
      return animeLarge;
    }
  };
  return <>{handleRender()}</>;
}
