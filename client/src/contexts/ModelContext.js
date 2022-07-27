import { createContext, useContext } from 'react';

const ModelContext = createContext();

export function ModelProvider({ model, children }) {
  return (
    <ModelContext.Provider value={model}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  return useContext(ModelContext);
}
