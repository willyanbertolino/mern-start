import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/global_reducer';

import { LOAD, LOADED, SHOW_ALERT, HIDE_ALERT } from '../actions';

const initialState = {
  loading: true,
  alert: {
    show: false,
    text: '',
    type: 'danger',
  },
};

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showAlert = ({ text, type = 'danger' }) => {
    dispatch({ type: SHOW_ALERT, payload: { text, type } });
  };

  const load = () => {
    dispatch({ type: LOAD });
  };

  const loaded = () => {
    dispatch({ type: LOADED });
  };

  const hideAlert = () => {
    dispatch({ type: HIDE_ALERT });
  };

  return (
    <GlobalContext.Provider
      value={{ ...state, load, loaded, showAlert, hideAlert }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider };
