import Atom from './atom';

declare class Root {
  constructor(updater: {update: (...args: any) => any});
  update(atom: Atom): any;
}

export default Root;
