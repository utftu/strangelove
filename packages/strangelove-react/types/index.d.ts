import {useStrangeLove} from './use-strange-love';
import {useStrangeLoveSelect} from './use-strange-love-select';
import {
  StrangeLoveContext,
  StrangeLoveProvider,
  UseStrangeLoveRoot,
} from './context';
import {RootConnected} from 'strangelove';

export type strangeLoveContext = StrangeLoveContext;
export type useStrangeLoveRoot = UseStrangeLoveRoot;
export const StrangeLoveProvider: StrangeLoveProvider;
export const defaultRoot: RootConnected;
export {useStrangeLove, useStrangeLoveSelect};
