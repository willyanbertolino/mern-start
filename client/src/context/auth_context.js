import React, { useEffect, useContext, useReducer, useState } from 'react';
import { api } from '../utils/constants';
import reducer from '../reducers/auth_reducer';
import { GET_USER, USER_LOADING, USER_VERIFICATION } from '../actions';

const initialState = {
  isLoading: true,
  user: null,
  verification: false,
  users: [],
};

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveUser = (user) => {
    // setUser(user);
  };

  const removeUser = () => {
    // setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/api/v1/users/current');
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
    dispatch({ type: USER_LOADING });
  };

  const logoutUser = async () => {
    try {
      await api.delete('/api/v1/auth/logout');
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  const setVerification = () => {
    dispatch({ type: USER_VERIFICATION });
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: GET_USER });
      dispatch({ type: USER_LOADING });
    }, 2000);
    //fetchUser();
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
