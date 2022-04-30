import styles from "./AnimeDropdown.module.scss";

export function AnimeDropdown({
  addWatched,
  addWatching,
  addPlanToWatch,
  checkList,
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
