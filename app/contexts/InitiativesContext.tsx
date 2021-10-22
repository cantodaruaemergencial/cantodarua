import InitiativesService from '#/services/InitiativesService';
import { FetchInitiatives, Initiative } from '#/types/Initiatives';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface InitiativesData {
  choosenInitiative: Initiative | undefined;
  setChoosenInitiative: (value: Initiative | undefined) => void;
  allInitiatives: Initiative[];
}

interface InitiativesProviderProps {
  children: ReactNode;
}

export const InitiativesContext = createContext({} as InitiativesData);

export function InitiativesProvider({ children }: InitiativesProviderProps) {
  const [selectedInitiative, setSelectedInitiative] = useState<
    Initiative | undefined
  >(undefined);

  const [allInitiatives, setAllInitiaves] = useState<Initiative[] | []>([]);

  const fetchInitiatives: FetchInitiatives = () =>
    InitiativesService.getInitiatives();

  useEffect(() => {
    fetchInitiatives().then((result) => {
      setAllInitiaves(result);
    });
  }, []);

  return (
    <InitiativesContext.Provider
      value={{
        choosenInitiative: selectedInitiative,
        setChoosenInitiative: setSelectedInitiative,
        allInitiatives,
      }}
    >
      {children}
    </InitiativesContext.Provider>
  );
}
