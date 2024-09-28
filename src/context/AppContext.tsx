'use client'

import {createContext, ReactNode, useReducer, useContext} from 'react';
import { Actions } from '../actions';
import { initialState, State, reducer } from '../reducer';

type AppContextType = {
    state: State,
    dispatch: React.Dispatch<Actions>,
};

export const AppContext = createContext<AppContextType | null>(null);


type ContextProviderProps = {
    children: ReactNode,
}

export function AppContextProvider({children}: ContextProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "The App Context must be used within an AppContextProvider"
    );
  }

  return context;
}