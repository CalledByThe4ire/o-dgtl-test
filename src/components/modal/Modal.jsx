import React, { useContext } from 'react';
import styles from './Modal.module.scss';
import { StoreContext, actions, createAction } from '../../reducer';

const Modal = () => {
  const store = useContext(StoreContext);
  const dispatch = store.dispatch;
  const state = store.state;

  if (!state.isOpen) {
    return null;
  }

  const handleClick = () =>
    dispatch(createAction(actions.HIDE_MODAL));

  return (
    <div className={styles.ModalOverlay}>
      <div className={styles.Modal}>
        <span className={styles.ModalClose} onClick={handleClick}>
          &#10005;
        </span>
      </div>
    </div>
  );
};

export default Modal;
