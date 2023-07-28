import {Atom} from '../atom/atom.ts';
import {Updater} from '../updaters/updaters.ts';

type Props = {
  updater: Updater;
};

export class Root {
  static new(props: Props) {
    return new Root(props);
  }

  updater: Updater;
  constructor({updater}: Props) {
    this.updater = updater;
  }

  update(atom: Atom) {
    return this.updater.update(atom);
  }
}
