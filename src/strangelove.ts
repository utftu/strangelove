import {
  Atom,
  createAtom,
  checkAtom,
  connectAtoms,
  disconnectAtoms,
  destroyAtom,
} from "./atom/atom.ts";
import { select } from "./select/select.ts";
import { type Cb, type Get } from "./select/run-cb/run-cb.ts";

type SelectCb = Cb;
type SelectGet = Get;

export { Atom, createAtom, checkAtom };
export { connectAtoms, disconnectAtoms, destroyAtom };
export { select };
export { type SelectCb, type SelectGet };
