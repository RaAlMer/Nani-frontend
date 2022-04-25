import styles from "./Navbar.module.css";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import { client } from "client";

export function Navbar() {
  const { logout, user, socket } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [senderName, setSenderName] = useState("");

  const toggleNav = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    socket?.on("getNotification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });
  }, [socket]);

  const getSenderName = async (senderId) => {
    const item = await client.get(`/auth/${senderId}`);
    setSenderName(item.data);
  };

  const displayNotifications = ({ senderId, type }) => {
    getSenderName(senderId);
    if (senderName !== "") {
      return (
        <span
          className={styles.notification}
        >{`${senderName} ${type} your comment`}</span>
      );
    }
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
        <>
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
              <li
                className={styles.items}
                onMouseEnter={() => setShowNotificationPanel(true)}
                onMouseLeave={() => setShowNotificationPanel(false)}
              >
                <Link to="/profile">{user.username}</Link>
                {notifications.length > 0 && (
                  <div className={styles.counter}>{notifications.length}</div>
                )}
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
          {showNotificationPanel && (
            <div className={styles.notifications}>
              {notifications.length > 0 &&
                notifications.map((n) => displayNotifications(n))}
            </div>
          )}
        </>
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
