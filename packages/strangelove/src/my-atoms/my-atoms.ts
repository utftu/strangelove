import {Atom} from '../atom/atom.ts';
import {select as selectBase} from '../select/select.ts';
import {createDefaultRoot} from '../root/default-root.ts';
import {Cb} from '../select/run-cb/run-cb.ts';

type Plugin = (myAtoms: MyAtoms) => void;

type Props = {
  plugins?: Plugin[];
};

type Select<TCb extends Cb> = (
  cb: Cb,
) => ReturnType<TCb> extends Promise<infer TResult>
  ? Promise<Atom<TResult>>
  : Atom<ReturnType<TCb>>;

export class MyAtoms {
  static new(props?: Props) {
    return new MyAtoms(props);
  }
  plugins: ((myAtoms: MyAtoms) => void)[];
  root = createDefaultRoot();
  onAtomCreate(atom: Atom) {
    return atom;
  }
  createAtom<TValue = any>(value: TValue) {
    const atom = Atom.new<TValue>({value, root: this.root});

    this.onAtomCreate(atom);

    return atom;
  }
  createSelect(cb: Cb) {
    return selectBase(cb, {
      root: this.root,
      onAtomCreate: (atom) => {
        this.onAtomCreate(atom);
      },
    });
  }
  constructor({plugins = []}: Props = {}) {
    this.plugins = plugins;
    this.plugins.forEach((plugin) => plugin(this));
  }
}

let myAtoms: MyAtoms | void;

export function getMyAtoms() {
  if (myAtoms === undefined) {
    myAtoms = MyAtoms.new();
  }
  return myAtoms;
}

export const atom = <TValue = any>(value: TValue) =>
  getMyAtoms().createAtom<TValue>(value);
export const select = <TCb extends Cb>(
  cb: TCb,
): ReturnType<TCb> extends Promise<infer TResult>
  ? Promise<Atom<TResult>>
  : Atom<ReturnType<TCb>> => getMyAtoms().createSelect(cb) as any;
