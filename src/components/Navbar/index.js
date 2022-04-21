import styles from "./Navbar.module.css";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";

export function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      {(showDropdown || screenWidth > 768) && (
        <ul className={styles.navbar}>
          <li className={styles.items}>
            <Link to="/">Home</Link>
          </li>
          {!user && (
            <li className={styles.items}>
              <Link to="/login-signup">Login/Signup</Link>
            </li>
          )}
          {user && (
            <li className={styles.items}>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {user && (
            <li className={styles.items}>
              <Link to="/friends">Friends</Link>
            </li>
          )}
          {user && (
            <li className={styles.items}>
              <Link to="/search">Anime</Link>
            </li>
          )}
          {user && (
            <li className={styles.items}>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      )}
      <input
        type={"checkbox"}
        className={styles.navToggle}
        onClick={toggleNav}
      />
      <div className={styles.hamburger}>
        <div className={`${styles.hamburger__line} ${styles.line1}`}></div>
        <div className={`${styles.hamburger__line} ${styles.line2}`}></div>
        <div className={`${styles.hamburger__line} ${styles.line3}`}></div>
      </div>
    </nav>
  );
}
