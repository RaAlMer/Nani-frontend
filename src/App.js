import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import { Footer, Navbar } from "./components";

function App() {
  return (
    <div className={styles.textColor}>
      <Navbar />
      Home
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default App;