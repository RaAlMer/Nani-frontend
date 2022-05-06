import styles from "./AnimeDropdown.module.scss";

// Component to display the different buttons to add an anime to a list
export function AnimeDropdown({
  addWatched,
  addWatching,
  addPlanToWatch,
}) {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>Add to List</button>
      <div className={styles.dropdown_content}>
        <button onClick={addWatched}>
          Watched
        </button>
        <button onClick={addWatching}>
          Watching
        </button>
        <button onClick={addPlanToWatch}>
          Plan To Watch
        </button>
      </div>
    </div>
  );
}
