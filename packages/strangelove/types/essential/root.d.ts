import Atom from './atom';
import Transaction from './transaction';

export class Root {
  constructor(config?: {update: (...args: any) => any});
  update(atom: Atom, cb?: (trx: Transaction) => void): Transaction;
}

export default Root;
