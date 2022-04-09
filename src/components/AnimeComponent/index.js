import styles from "./Anime.module.css";
import { client } from "../../client";
import { useEffect, useState } from "react";

export function AnimeComponent(props) {
  const [anime, setAnime] = useState();
  useEffect(() => {
    const getAnime = async () => {
      const item = await client.get(`/anime/${props.id}`);
      const result = item.data;
      //return result
      setAnime(result)
    };
    getAnime()
  }, []);

  return (<>
  {anime && (
      <div className="anime">
        <img
          src= {`https://media.kitsu.io/anime/poster_images/${ anime.id }/small.jpg`}
          alt=""
        />
        <ul>
      <li>
        <div className="rating">
          <h2 id="averageRatingLabel">Average Rating</h2>
          <h2 id="averageRating">{ anime.attributes.averageRating}</h2>
        </div>
      </li>
      <li>
        <div className="animeDetails">
          <p id="subtype">{ anime.attributes.subtype }</p>
          <p id="status">{ anime.attributes.status }</p>
          <p id="ageRating">Rated: { anime.attributes.ageRating }</p>
          <p id="episodeCount">Episodes: { anime.attributes.episodeCount }</p>
        </div>
      </li>
      
    </ul>
      </div>
    )}
  </>
    
    
  );
}
