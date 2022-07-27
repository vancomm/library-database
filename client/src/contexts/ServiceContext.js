import { createContext, useContext } from 'react';

const ServiceContext = createContext();

export function ServiceProvider({ service, children }) {
  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  return useContext(ServiceContext);
}
