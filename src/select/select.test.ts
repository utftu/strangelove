import {describe, it, expect} from "bun:test";
import {select} from './select.ts';
import {createAtom, destroyAtom} from '../atom/atom.ts';

describe('select', () => {
  it('destroy() снимает select с источника', () => {
    const source = createAtom(1);

    let runs = 0;
    const derived = select((get) => {
      runs++;
      return get(source) * 2;
    });

    expect(source.relations.children.size).toBe(1);

    destroyAtom(derived);
    runs = 0;
    source.set(2);

    expect(source.relations.children.size).toBe(0);
    expect(runs).toBe(0);
  });

  // exec у select зовёт replaceParents, поэтому явный update() на
  // уничтоженном атоме подписывает его обратно. Отдельного запрета нет
  it('update() на уничтоженном select возвращает связи', () => {
    const source = createAtom(1);
    const derived = select((get) => get(source) * 2);

    destroyAtom(derived);
    expect(derived.relations.parents.size).toBe(0);

    derived.update();
    expect(derived.relations.parents.size).toBe(1);
  });

  it('select sync', () => {
    const parent = createAtom('parent');
    const child = select((get) => {
      return get(parent) + ' + ' + 'child';
    });
    parent.set('parent new');
    expect(child.get()).toBe('parent new + child');
  });
});
