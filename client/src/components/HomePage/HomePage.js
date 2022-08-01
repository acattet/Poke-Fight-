import styles from './styles.module.css';
import { Link } from "react-router-dom";
import Auth from "../../utils/auth.js";

export const HomePage = ({ battleClick, onStartClick }) => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className={styles.main}>
      <div className={styles.homeContainer}>
        {Auth.loggedIn() ? (
          <>
            <a href="/" onClick={logout}>Logout</a>
            <button className={styles.startButton} onClick={battleClick}>
              Character Selection!
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className={styles.startButton}>
                Login!
              </button>
            </Link>
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button className={styles.startButton}>
                Sign up!
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};