import { client } from "../../client";
import { useState } from "react";
import styles from "./AnimeDropdown.module.scss";

export function AnimeDropdown({ addWatched, addWatching, addPlanToWatch, id }) {
  const [show, setShow] = useState(false);

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
