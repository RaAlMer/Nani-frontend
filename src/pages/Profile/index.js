import { AnimeComponent } from "components";
import { AuthContext } from "context";
import { useContext } from "react";
import styles from "./Profile.module.css";

export function Profile() {
  const {user} = useContext(AuthContext);

  const watchedList = user.watched.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />;
  });
  const watchingList = user.watching.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />;
  });
  const planToWatchList = user.planToWatch.map((item) => {
    return <AnimeComponent key={item.id} id={item.id} type="tiny" />;
  });
  return (
    <div>
      <h1>Profile</h1>
      <h2> {user.username}</h2>
      <ul className="lists">
        <li>
          <p>Watched</p>
        </li>
        <ul className="list">
          {watchedList}
        </ul>
        <li>
          <p>Watching</p>
        </li>
        <ul className="list">
          {watchingList}
        </ul>
        <li>
          <p>Plan To Watch</p>
        </li>
        <ul className="list">
          {planToWatchList}
        </ul>
      </ul>
    </div>
  )
}
