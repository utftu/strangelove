import type {useContext, Provider, Context} from 'react';
import {UserRoot} from 'strangelove';

export type StrangeLoveContext = Context<UserRoot>;
export type StrangeLoveProvider = Provider<UserRoot>;
export type UseStrangeLoveRoot = typeof useContext<UserRoot>;
