import {useStrangeLove} from './use-strange-love';
import {UseStrangeLoveSelect} from './use-strange-love-select';
import {
  StrangeLoveContext,
  StrangeLoveProvider,
  UseStrangeLoveRoot,
} from './context';
import {UserRoot} from 'strangelove';

// export const useStrangeLove: UseStrangeLove;
export type useStrangeLoveSelect<T> = UseStrangeLoveSelect<T>;
export type strangeLoveContext = StrangeLoveContext;
export type useStrangeLoveRoot = UseStrangeLoveRoot;
export const StrangeLoveProvider: StrangeLoveProvider;
export const defaultRoot: UserRoot;
export {useStrangeLove};
