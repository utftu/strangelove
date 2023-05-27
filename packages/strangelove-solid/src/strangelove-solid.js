import {createStore} from './store/store.js';
import {connectAtoms, disconnectAtoms, Atom} from 'strangelove';

export function patchAtom(atom) {
  const connectedAtom = Atom.new({
    exec: () => {},
  });
  connectAtoms(atom, connectedAtom);
  const state = createStore(
    () => atom.get(),
    (cb) => {
      connectAtoms.exec = () => cb(atom.get());
      return () => disconnectAtoms(atom, connectedAtom);
    }
  );

  atom.solid = {
    get() {
      return state();
    },
    set(value) {
      return atom.set(value);
    },
  };
}

export function addSvelteMyAtoms(myAtoms) {
  const oldOnAtomCreate = myAtoms.onAtomCreate;
  myAtoms.onAtomCreate = (atom) => {
    patchAtom(atom);
    return oldOnAtomCreate.apply(myAtoms, atom);
  };
}

// function createConnectedStore(name, value, ee) {
//   return createStore(
//     () => value,
//     (cb) => {
//       ee.on(name, cb);
//       return () => ee.off(name, cb);
//     }
//   );
// }

// function transformForm(form) {
//   form.solid = {};
//   form.solid.makeStore = (name, value) => {
//     form.solid[name] = createConnectedStore(name, value, form.eeSync);
//   };
//   form.solid.makeStore('valid', form.valid);
//   form.solid.makeStore('global', null);

//   const oldCreateField = form.createField;
//   form.createField = function (...args) {
//     const field = oldCreateField.call(form, ...args);
//     transformField(field);
//     return field;
//   };
// }

// function transformField(field) {
//   field.solid = {};
//   field.solid.makeStore = (name, value) => {
//     field.solid[name] = createConnectedStore(name, value, field.eeSync);
//   };

//   for (const name in field.data) {
//     field.solid.makeStore(name, field.data[name]);
//   }
//   field.solid.makeStore('errorTouched', field.errorTouched);
//   field.solid.makeStore('global', null);
// }

// export const addSolidPlugin = () => (form) => {
//   transformForm(form);
// };
