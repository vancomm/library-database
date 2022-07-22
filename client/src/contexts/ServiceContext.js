import { createContext, useContext, useMemo } from 'react';

const ServiceContext = createContext();

export function ServiceProvider({ service, children }) {
  const value = useMemo(() => ({ service }), []);
  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  return useContext(ServiceContext);
}
