import type {useContext, Provider, Context} from 'react';
import type {RootConnected} from 'strangelove';

export type StrangeLoveContext = Context<RootConnected>;
export type StrangeLoveProvider = Provider<RootConnected>;
export type UseStrangeLoveRoot = typeof useContext<RootConnected>;
