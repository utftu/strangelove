import Atom from './atom';

export class Root {
  constructor(config?: {update: (...args: any) => any});
  update(atom: Atom): any;
}

export default Root;
