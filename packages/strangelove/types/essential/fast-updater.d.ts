import Atom from './atom';
import Transaction from './transaction';

export default class FastUpdater {
  constructor(config?: {batch: () => void});
  update(atom: Atom, cb?: (trx: Transaction) => void): void;
}
