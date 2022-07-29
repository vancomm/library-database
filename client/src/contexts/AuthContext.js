/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext, useContext, useMemo, useState,
} from 'react';
import AuthService from '../services/Auth.service';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const getUser = () => {
    const userString = sessionStorage.getItem('user');
    const userData = JSON.parse(userString);
    return userData;
  };

  const [user, setUser] = useState(getUser());

  const saveUser = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const unsetUser = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const unsetToken = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  };

  const tryLogin = async (username, password) => {
    const res = await AuthService.tryLogin(username, password);
    if (res.success) {
      saveUser(res.user);
      saveToken(res.token);
    }
    return res;
  };

  const tryRegister = async (username, name, role, password) => {
    const res = await AuthService.tryRegister(username, name, role, password);
    if (res.success) {
      saveUser(res.user);
      saveToken(res.token);
    }
    return res;
  };

  const update = async () => {
    const res = await AuthService.update(token);
    if (res.success) {
      saveUser(res.user);
    } else {
      console.log(res.message);
    }
  };

  const signout = () => {
    unsetUser();
    unsetToken();
  };

  const values = {
    user, token, tryLogin, tryRegister, update, signout,
  };

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
