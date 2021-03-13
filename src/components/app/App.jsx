import styles from './App.module.scss';

const App = () => (
  <div className={styles.App}>
    <div className={styles.AppContainer}>
      <button type="button" className={styles.AppButton}>
        Налоговый вычет
      </button>
    </div>
  </div>
);

export default App;
