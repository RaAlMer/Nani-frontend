import { client } from "../../client";
import { useState } from "react";

export function AnimeDropdown({ id }) {
  const [show, setShow] = useState(false);

  const addWatched = async () => {
    await client.get(`/anime/addList/${id}/watched`);
  };
  const addWatching = async () => {
    await client.get(`/anime/addList/${id}/watching`);
  };
  const addPlanToWatch = async () => {
    await client.get(`/anime/addList/${id}/planToWatch`);
  };

  return (
    <div>
      {!show ? (
        <div>
          <button onClick={() => setShow(!show)}>Add to list</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setShow(!show)}>Close</button>
          <button onClick={addWatched}>Watched</button>
          <button onClick={addWatching}>Watching</button>
          <button onClick={addPlanToWatch}>Plan to watch</button>
        </div>
      )}
    </div>
  );
}
