import { createContext, ReactNode, useState } from 'react';

interface InitiativesData {
  choosenInitiative: string | undefined;
  setChoosenInitiative: (value: string | undefined) => void;
}

interface InitiativesProviderProps {
  children: ReactNode;
}

export const InitiativesContext = createContext({} as InitiativesData);

export function InitiativesProvider({ children }: InitiativesProviderProps) {
  const [selectedInitiative, setSelectedInitiative] = useState<
    string | undefined
  >(undefined);

  return (
    <InitiativesContext.Provider
      value={{
        choosenInitiative: selectedInitiative,
        setChoosenInitiative: setSelectedInitiative,
      }}
    >
      {children}
    </InitiativesContext.Provider>
  );
}
