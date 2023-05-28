import {describe} from 'vitest';
import {getMyAtoms, atom} from './my-atoms.js';
import {it} from 'vitest';

describe('my-atoms', () => {
  it('getMyAtoms', () => {
    const myAtoms = getMyAtoms();
    const oldOnAtomCreate = myAtom;
  });
});
