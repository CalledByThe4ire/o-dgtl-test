import React from 'react';

// Contexts
export const StoreContext = React.createContext(null);

// Action constants
export const actions = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  ADD_SALARY: 'ADD_SALARY',
  CLEAR_SALARY: 'CLEAR_SALARY',
};

export const createAction = (type, payload) => {
  return {
    type,
    payload,
  };
};

// Reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SHOW_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case actions.HIDE_MODAL:
      return {
        ...state,
        isOpen: false,
      };
    case actions.ADD_SALARY:
      return {
        ...state,
        salary: action.payload,
      };
      case actions.CLEAR_SALARY:
        return {
          ...state,
          salary: null,
        };
    default:
      return state;
  }
};
