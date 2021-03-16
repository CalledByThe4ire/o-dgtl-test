import React, { useContext, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { StoreContext, actions, createAction } from '../../reducer';
import Icon from '../icon';
import Form from '../form';
import styles from './Modal.module.scss';
import 'animate.css/animate.min.css';

const Modal = () => {
  const modalRef = useRef(null);
  const modalCloseRef = useRef(null);

  const store = useContext(StoreContext);
  const dispatch = store.dispatch;
  const state = store.state;

  const animationBaseClass = 'animate__animated animate__fast';

  const handleClick = () => {
    dispatch(createAction(actions.HIDE_MODAL));

    if (modalRef && modalRef.current) {
      modalRef.current.classList.remove('animate__bounceIn');
    }
  };

  const handleClickOutside = ({ target }) => {
    if (modalRef && modalRef.current) {
      modalRef.current.classList.remove('animate__bounceIn');

      if (modalRef.current.contains(target)) {
        return;
      }
    }
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

  useEffect(() => {
    if (modalRef && modalRef.current) {
      modalRef.current.classList.add('animate__bounceIn');
    }
  }, [state.isOpen]);

  if (!state.isOpen) {
    return null;
  }

  return (
    <div
      className={classnames(animationBaseClass, styles.ModalOverlay)}
      onClick={handleClickOutside}
    >
      <div className={styles.Modal} ref={modalRef}>
        <button
          type="button"
          className={styles.ModalClose}
          onClick={handleClick}
          ref={modalCloseRef}
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
