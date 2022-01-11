import React, { useEffect, useContext, useReducer } from 'react';
import { api } from '../utils/constants';
import reducer from '../reducers/auth_reducer';

import { GET_USER } from '../actions';
import { useGlobalContext } from './global_context';

const initialState = {
  user: null,
  users: [],
};

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const { loaded } = useGlobalContext();
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
    // setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await api.delete('/api/v1/auth/logout');
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: GET_USER });
      loaded(false);
    }, 2000);
    //fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, saveUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
