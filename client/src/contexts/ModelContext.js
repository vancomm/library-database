import { createContext, useContext, useMemo } from 'react';

const ModelContext = createContext();

export function ModelProvider({ model, children }) {
  const value = useMemo(() => ({ model }), []);
  return (
    <ModelContext.Provider value={value}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  return useContext(ModelContext);
}
