import {createContext, useContext} from 'react';
import defaultRoot from './default-root.js';

export const strangeLoveContext = createContext(defaultRoot);
export const StrangeLoveProvider = strangeLoveContext.Provider;
export const useStrangeLoveRoot = () => useContext(strangeLoveContext);
