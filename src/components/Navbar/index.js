import styles from "./Navbar.module.scss";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import { client } from "client";
import { BsBellFill } from "react-icons/bs";
import logo from "./nani_logo.png";

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

  const displayNotifications = ({ senderId, type, url }) => {
    getSenderName(senderId);
    if (senderName !== "") {
      return (
        <Link
          to={url}
          className={styles.notification}
        >{`${senderName} ${type}`}</Link>
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
      <ul className={styles.navbar}>
        {screenWidth > 768 ? (
          // Desktop version
          <>
            <div className={styles.group_profile}>
              <li className={styles.logo}>
                <Link to="/">
                  <img src={logo} alt="nani logo" width={100} />
                </Link>
              </li>
            </div>
            <div className={styles.group}>
              {!user && (
                <li className={styles.items}>
                  <Link to="/login-signup">Login/Signup</Link>
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
            </div>
            <div className={styles.group_profile}>
              {user && (
                <li
                  className={styles.profile}
                  onClick={() =>
                    setShowNotificationPanel(!showNotificationPanel)
                  }
                >
                  <BsBellFill />
                  {notifications.length > 0 && (
                    <div className={styles.counter}>{notifications.length}</div>
                  )}
                </li>
              )}
              {user && (
                <li className={styles.profile}>
                  <Link to="/profile">{user.username}</Link>
                </li>
              )}
              {user && (
                <li className={styles.profile}>
                  <button onClick={logout}>Logout</button>
                </li>
              )}
            </div>
          </>
        ) : (
          // Tablet and mobile version
          <>
            <div className={styles.group_profile}>
              <div>
                <li className={styles.logo}>
                  <Link to="/">
                    <img src={logo} alt="nani logo" width={100} />
                  </Link>
                </li>
              </div>
              <div>
                {user && (
                  <li
                    className={styles.profile}
                    onClick={() =>
                      setShowNotificationPanel(!showNotificationPanel)
                    }
                  >
                    <BsBellFill />
                    {notifications.length > 0 && (
                      <div className={styles.counter}>
                        {notifications.length}
                      </div>
                    )}
                  </li>
                )}
                {user && (
                  <li className={styles.profile}>
                    <Link to="/profile">
                      <img src={user.image} alt={user.image}/>
                    </Link>
                  </li>
                )}
                {user && (
                  <li className={styles.profile}>
                    <button onClick={logout}>Logout</button>
                  </li>
                )}
              </div>
            </div>
            {(showDropdown || screenWidth > 768) && (
              <div className={styles.group}>
                {!user && (
                  <li className={styles.items}>
                    <Link to="/login-signup">Login/Signup</Link>
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
              </div>
            )}
          </>
        )}
      </ul>
      {showNotificationPanel && (
        <div className={styles.notifications}>
          {notifications.length > 0 &&
            notifications.map((n) => displayNotifications(n))}
        </div>
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
