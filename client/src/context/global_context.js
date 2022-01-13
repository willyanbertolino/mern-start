import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/global_reducer';

import { SHOW_ALERT, HIDE_ALERT, ACTIVATE_LINK } from '../actions';

const initialState = {
  activeLink: '',
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

  const hideAlert = () => {
    dispatch({ type: HIDE_ALERT });
  };

  const activateLink = (name) => {
    dispatch({ type: ACTIVATE_LINK, payload: name });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        showAlert,
        hideAlert,
        activateLink,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider };
