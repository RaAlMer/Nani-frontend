import { Spinner } from "components";
import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Confirm.module.scss";

export function Confirm() {
  const [confirming, setConfirming] = useState(true);
  const { verifyEmail } = useContext(AuthContext);
  const { id } = useParams();

  const confirmedEmail = () => {
    verifyEmail(id);
    setConfirming(false);
  };

  useEffect(() => {
    confirmedEmail();
  }, []);

  return (
    <div className={styles.confirm}>
      {confirming ? (
        <Spinner />
      ) : (
        <div className={styles.page}>
          <p className={styles.join}>Thanks for joining</p>
          <h1>Your registration is complete.</h1>
          <Link to="/login-signup" className={styles.btn}>
            Go to login page
          </Link>
        </div>
      )}
    </div>
  );
}
