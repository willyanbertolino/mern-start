import React, { useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/auth_reducer';
// import { useCookies } from 'react-cookie';

import {
  GET_USER,
  USER_LOADING,
  USER_VERIFICATION,
  REMOVE_USER,
} from '../actions';

const initialState = {
  isLoading: true,
  user: null,
  verification: false,
};

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveUser = (user) => {
    dispatch({ type: GET_USER, payload: user });
  };

  const removeUser = () => {
    dispatch({ type: REMOVE_USER });
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/showMe`);
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
    dispatch({ type: USER_LOADING });
  };

  const logoutUser = async () => {
    try {
      await axios.delete('/api/v1/auth/logout');
      removeUser();
    } catch (error) {
      console.log(error.response);
    }
  };

  const setVerification = (value) => {
    dispatch({ type: USER_VERIFICATION, payload: value });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, saveUser, logoutUser, setVerification }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
