import { Signup, Login } from "components";
import styles from "./SignupLogin.module.scss";
import { useContext } from "react";
import { AuthContext } from "context";
import { FaTwitter, FaInstagram, FaGithub, FaGoogle } from "react-icons/fa";
import GoogleLogin from "react-google-login";
import { Alert } from "components";

export function SignupLogin() {
  const { loginGoogle, loginError, signupError } = useContext(AuthContext);

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
        {loginError && <Alert type="error" message={loginError} />}
        {signupError && <Alert type="error" message={signupError} />}
        <ul
          className={styles.wrapper}
          style={{
            marginTop:
              (loginError === true) | (signupError === true) ? "60px" : "0",
          }}
        >
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
