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
      <Footer />
    </div>
  );
}

export default App;
