import styles from "./Signup.module.scss";
import { useState, useContext } from "react";
import { AuthContext } from "context";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";
import GoogleLogin from "react-google-login";
import { client } from "../../client";

export function Signup() {
  const { signup, loginGoogle, tokenGoogle, user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, email, password);
  };

  /* const responseFacebook = (data) => {
    console.log(data);
    setShowLoading(true);
    const {
      name,
      email,
      picture: {
        data: { url },
      },
      userID,
    } = data;
    let newUser = { name, email, image: url, facebookId: userID };
    client
      .post(`/auth/facebook/info`, newUser, { withCredentials: true })
      .then((response) => {
        setLoggedInUser(response.data.data);
        setShowError(null);
        setShowLoading(false);
      });
  }; */

  const handleGoogleSuccess = async (data) => {
    const { givenName, familyName, email, imageUrl, googleId } =
      data.profileObj;
    loginGoogle(givenName, familyName, email, imageUrl, googleId);
    tokenGoogle(data.tokenId);
  };

  const handleGoogleFailure = (error) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className={styles.group}>
        <button className={styles.button}>Sign Up</button>
      </div>
      <div className={styles.hr}></div>
      <ul className={styles.wrapper}>
        <li className={`${styles.icon} ${styles.facebook}`}>
          <span className={styles.tooltip}>Facebook</span>
          <span>
            <FaFacebookF />
          </span>
        </li>
        <li className={`${styles.icon} ${styles.twitter}`}>
          <span className={styles.tooltip}>Twitter</span>
          <span>
            <FaTwitter />
          </span>
        </li>
        <li className={`${styles.icon} ${styles.google}`}>
          <span className={styles.tooltip}>Google</span>
          <span>
            {/* <FaGoogle /> */}
            <GoogleLogin
              clientId={`697160381985-4f592dib4sitpdaf88967ck4mg8og74r.apps.googleusercontent.com`}
              buttonText="Login"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
              className={`${styles.icon} ${styles.google}`}
            />
          </span>
        </li>
        <li className={`${styles.icon} ${styles.instagram}`}>
          <span className={styles.tooltip}>Instagram</span>
          <span>
            <FaInstagram />
          </span>
        </li>
        <li className={`${styles.icon} ${styles.github}`}>
          <span className={styles.tooltip}>Github</span>
          <span>
            <FaGithub />
          </span>
        </li>
      </ul>
    </form>
  );
}
