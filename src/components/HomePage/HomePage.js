import styles from './styles.module.css';

export const HomePage = ({ battleClick }) => {
  return (
    <div className={styles.main}>
      <button className={styles.startButton} onClick={battleClick}>
        Character Selection!
      </button>
    </div>
  );
};
