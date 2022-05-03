import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Footer, Navbar } from "./components";

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
