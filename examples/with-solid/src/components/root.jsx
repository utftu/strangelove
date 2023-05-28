import {atom, getMyAtoms, select} from 'strangelove';
import {addSolidMyAtoms} from 'strangelove-solid';
import {createEffect} from 'solid-js';

export function Root() {
  addSolidMyAtoms(getMyAtoms());
  const nameAtom = atom('Aleksey');
  const familyAtom = atom('Smith');
  const fullname = select((get) => get(nameAtom) + ' ' + get(familyAtom));

  return (
    <div>
      <div>
        Name:
        <input
          value={nameAtom.solid.get()}
          onInput={(event) => {
            nameAtom.solid.set(event.target.value);
          }}
        />
        <div>{nameAtom.solid.get()}</div>
      </div>
      <div>
        Family:
        <input
          value={familyAtom.solid.get()}
          onInput={(event) => {
            familyAtom.solid.set(event.target.value);
          }}
        />
        <div>{familyAtom.solid.get()}</div>
      </div>
      <div>
        Fullname:
        <div>{fullname.solid.get()}</div>
      </div>
    </div>
  );
}
