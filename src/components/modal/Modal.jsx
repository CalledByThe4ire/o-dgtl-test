import React, { useContext, useEffect, useRef } from 'react';

import { StoreContext, actions, createAction } from '../../reducer';
import Icon from '../icon';
import Form from '../form';
import styles from './Modal.module.scss';

const Modal = () => {
  const modalRef = useRef(null);
  const store = useContext(StoreContext);
  const dispatch = store.dispatch;
  const state = store.state;

  const handleClick = () => dispatch(createAction(actions.HIDE_MODAL));

  const handleClickOutside = ({ target }) => {
    if (modalRef && modalRef.current.contains(target)) {
      return;
    }

    dispatch(createAction(actions.HIDE_MODAL));
  };

  useEffect(() => {
    const handleKeyDown = ({ keyCode }) => {
      if (keyCode === 27) {
        dispatch(createAction(actions.HIDE_MODAL));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  if (!state.isOpen) {
    return null;
  }

  return (
    <div className={styles.ModalOverlay} onClick={handleClickOutside}>
      <div className={styles.Modal} ref={modalRef}>
        <button
          type="button"
          className={styles.ModalClose}
          onClick={handleClick}
        >
          <Icon name="cross" width="12" fill="#ea0029" />
        </button>
        <h2 className={styles.ModalTitle}>Налоговый вычет</h2>
        <p className={styles.ModalDescription}>
          Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер
          налогового вычета составляет не&nbsp;более&nbsp;13% от&nbsp;своего
          официального годового дохода.
        </p>
        <Form />
      </div>
    </div>
  );
};

export default Modal;
