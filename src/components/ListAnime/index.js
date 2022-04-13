import { AnimeComponent } from "components/AnimeComponent";

export function ListAnime({ anime }) {
  return anime.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />;
  });
}
