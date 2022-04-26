import styles from "./Spinner.module.scss";

export function Spinner() {
  return (
    <div className="spinner-container">
      <div className={styles.loading_spinner}></div>
    </div>
  );
}
