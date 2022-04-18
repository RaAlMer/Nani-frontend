import { client } from "client";
import { AnimeComponent } from "components/AnimeComponent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Profiles({ owner }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const getFriends = async () => {
    const item = await client.get(`/friend/${owner._id}`);
    const result = item.data;
    setFollowers(result.followers);
    setFollowing(result.following);
  };

  useEffect(() => {
    getFriends();
  }, []);

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
      <h1>{owner.username}</h1>
      <div>
        <Link to={`/Follow/${owner._id}`}>
          <h2>Following</h2>
          <p>{following.length}</p>
        </Link>
        <Link to={`/Follow/${owner._id}`}>
          <h2>Followers</h2>
          <p>{followers.length}</p>
        </Link>
      </div>
      <br />
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
