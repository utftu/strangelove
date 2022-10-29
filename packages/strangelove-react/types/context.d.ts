import type {useContext, Provider, Context} from 'react';
import {Root} from 'strangelove';

export type StrangeLoveContext = Context<Root>;
export type StrangeLoveProvider = Provider<Root>;
export type UseStrangeLoveRoot = typeof useContext<Root>;
