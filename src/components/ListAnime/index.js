export function ListAnime({ anime }) {
  return anime.map((item) => {
    return (
      <li>
        <a href={`/anime/${item.id}`}>
          <img
            src={`https://media.kitsu.io/anime/poster_images/${item.id}/tiny.jpg`}
            alt=""
          ></img>
          <p id="animeTitle"> {item.attributes.canonicalTitle} </p>
        </a>
      </li>
    );
  });
}
