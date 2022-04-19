import { Signup, Login } from "components";
import styles from "./Login.module.scss";
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
/* import FacebookLogin from "react-facebook-login";
import { client } from "../../client"; */

export function SignupLogin() {
  const { loginGoogle, tokenGoogle } = useContext(AuthContext);
  /* const [showLoading, setShowLoading] = useState(false); */

  /* const onFacebookResponse = (data) => {
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
        console.log(response);
        setShowLoading(false);
      });
  }; */

  /* const handleFacebook = async () => {
    const response = await client.get("/auth/facebook/callback", {
      facebookId: user.facebookId,
    });
    const response = await client.post("/auth/facebook/callback");
    console.log(response);
  } */

  const handleGoogleSuccess = async (data) => {
    const { givenName, familyName, email, imageUrl, googleId } =
      data.profileObj;
    loginGoogle(givenName, familyName, email, imageUrl, googleId);
    /* tokenGoogle(data.tokenId); */
  };

  const handleGoogleFailure = (error) => {
    console.log(error);
  };

  return (
    <div className={styles.login_wrap}>
      <div className={styles.login_html}>
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className={styles.log_in}
          defaultChecked
        />
        <label htmlFor="tab-1" className={styles.tab}>
          Log In
        </label>
        <input id="tab-2" type="radio" name="tab" className={styles.sign_up} />
        <label htmlFor="tab-2" className={styles.tab}>
          Sign Up
        </label>
        <div className={styles.login_form}>
          <div className={styles.log_in_component}>
            <Login />
          </div>
          <div className={styles.sign_up_component}>
            <Signup />
          </div>
        </div>
        <ul className={styles.wrapper}>
          {/* <li className={`${styles.icon} ${styles.facebook}`}>
            <span className={styles.tooltip}>Facebook</span>
            <span>
              <FacebookLogin
                appId="1182218065921023"
                autoLoad={false}
                fields="name,email,picture"
                callback={onFacebookResponse}
                render={(renderProps) => (
                  <span onClick={renderProps.onClick}>
                    <FaFacebookF />
                  </span>
                )}
              />
            </span>
          </li> */}
          <li className={`${styles.icon} ${styles.twitter}`}>
            <span className={styles.tooltip}>Twitter</span>
            <span>
              <FaTwitter />
            </span>
          </li>
          <li className={`${styles.icon} ${styles.google}`}>
            <span className={styles.tooltip}>Google</span>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_ID}
              buttonText={<FaGoogle />}
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <span
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FaGoogle />
                </span>
              )}
            />
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
      </div>
    </div>
  );
}
