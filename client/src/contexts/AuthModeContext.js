import {
  createContext, useContext, useMemo, useState,
} from 'react';

const AuthModeContext = createContext();

export function AuthModeProvider({ children }) {
  const [authMode, setAuthMode] = useState('login');

  const isLogin = authMode === 'login';
  const isSignup = authMode === 'signup';

  const setLogin = () => { setAuthMode('login'); };
  const setSignup = () => { setAuthMode('signup'); };
  const toggleAuthMode = authMode === 'login' ? setSignup : setLogin;

  const value = useMemo(() => ({
    authMode, isLogin, isSignup, setLogin, setSignup, toggleAuthMode,
  }), [authMode]);

  return (
    <AuthModeContext.Provider value={value}>
      {children}
    </AuthModeContext.Provider>
  );
}

export function useAuthMode() {
  return useContext(AuthModeContext);
}
