import {createContext, useContext} from 'react';

export const strangeLoveContext = createContext(null);
export const StrangeLoveProvider = strangeLoveContext.Provider;
export const useStrangeLoveRoot = () => useContext(strangeLoveContext);
