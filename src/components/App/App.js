import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { Battle, EndMenu, StartMenu, HomePage, SelectionScreen, } from 'components';

export const App = () => {
  const [winner, setWinner] = useState();
  const [mode, setMode] = useState('start');

  useEffect(() => {
    if (mode === 'battle') {
      setWinner(undefined);
    }
  }, [mode]);

  //each onclick changes to the next page

  return (
    <div className={styles.main}>


      {mode === 'start' && (
        <StartMenu onStartClick={() => setMode('homepage')} />
      )}


      {mode === 'homepage' && (
        <HomePage battleClick={() => setMode('SelectionScreen')} />
      )}



      {mode === 'SelectionScreen' && (
        <SelectionScreen characterClick={() => setMode('battle')}/>
      )}


      {mode === 'battle' && (
        <Battle
          onGameEnd={winner => {
            setWinner(winner);
            setMode('gameOver');
          }}
        />
      )}

      {mode === 'gameOver' && !!winner && (
        <EndMenu winner={winner} onStartClick={() => setMode('battle')} />
      )}
    </div>
  );
};
