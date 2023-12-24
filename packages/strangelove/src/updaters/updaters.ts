import {Atom} from '../atom/atom.ts';

type PromiseResult = {
  startTime: number;
  finishTime: number;
};

type UpdateResult = {
  startTime: number;
  finishTime: number | null;
  promise: Promise<PromiseResult>;
};

export type TransactionKey = {
  startTime: number;
};

export type UpdaterConfig = {
  data: any;
};

export abstract class Updater {
  abstract update(atom: Atom, config?: UpdaterConfig): UpdateResult;
}
