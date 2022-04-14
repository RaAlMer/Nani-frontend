import { Signup, Login } from "components";
import styles from "./Login.module.css";

export function SignupLogin() {
  return (
    <div className={styles.log}>
      <input id="tab-1" type="radio" name="tab" className={styles.log_in} defaultChecked />
      <label htmlFor="tab-1" className={styles.tab}>
        Log In
      </label>
      <input id="tab-2" type="radio" name="tab" className={styles.sign_up} />
      <label htmlFor="tab-2" className={styles.tab}>
        Sign Up
      </label>
      <div className={styles.forms}>
        <Signup className={styles.sign_up_component} />
        <Login className={styles.log_in_component} />
      </div>
    </div>
  );
}
