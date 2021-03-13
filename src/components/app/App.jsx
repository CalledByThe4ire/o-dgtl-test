import React, { useReducer } from 'react';

import initialState from '../../initialState';
import { reducer, StoreContext, createAction, actions } from '../../reducer';

import styles from './App.module.scss';
import Modal from '../modal';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = () => dispatch(createAction(actions.SHOW_MODAL));

  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <Modal />
      <div className={styles.App}>
        <div className={styles.AppContainer}>
          <button
            type="button"
            className={styles.AppButton}
            onClick={handleClick}
            disabled={state.isOpen}
          >
            Налоговый вычет
          </button>
        </div>
      </div>
    </StoreContext.Provider>
  );
};

export default App;
