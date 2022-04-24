import styles from "./Login.module.scss";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "context";
import ReCAPTCHA from "react-google-recaptcha";
import { Alert } from "components";

export function Login() {
  const { login, sentMail } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captchaToken = await recaptchaRef.current.getValue();
    recaptchaRef.current.reset();

    login(email, password, captchaToken);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label htmlFor="email">Email:</label>
        <input
          id="emailLogin"
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
          id="passwordLogin"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className={styles.group}>
        <button className={styles.button}>Log In</button>
      </div>
      <div className={styles.hr}></div>
      <div className={styles.captcha}>
        <ReCAPTCHA
          sitekey="6LfvUZYfAAAAAG3JRIpBf5Isk78Msn948ZW-XZSv"
          ref={recaptchaRef}
        />
      </div>
      {sentMail && <Alert  type="success" message={sentMail}/>}
      <div className={styles.foot_lnk}>
        <a href="#">Forgot Password?</a>
      </div>
    </form>
  );
}
