import { AnimeComponent } from "components/AnimeComponent";

export function Profiles({owner}) {
  console.log(owner)
  const watchedList = owner.watched.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />;
  });
  const watchingList = owner.watching.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />;
  });
  const planToWatchList = owner.planToWatch.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />;
  });
  return (
    <div>
      <h1>Profile</h1>
      <h2> {owner.username}</h2>
      <ul className="lists">
        <li>
          <p>Watched</p>
        </li>
        <ul className="list">{watchedList}</ul>
        <li>
          <p>Watching</p>
        </li>
        <ul className="list">{watchingList}</ul>
        <li>
          <p>Plan To Watch</p>
        </li>
        <ul className="list">{planToWatchList}</ul>
      </ul>
    </div>
  );
}
