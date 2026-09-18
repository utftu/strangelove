import { describe, it, vi, expect } from "vitest";

import { Atom, createAtom } from "../atom/atom.ts";
import { select } from "../select/select.ts";

describe("updater", () => {
  it("chain", () => {
    const atom3Exec = vi.fn();
    const atom1 = new Atom();
    const atom2 = new Atom();
    const atom3 = new Atom({ exec: atom3Exec });

    Atom.connect(atom1, atom2);
    Atom.connect(atom2, atom3);

    expect(atom3Exec.mock.calls.length).toBe(0);
    atom1.update();

    expect(atom3Exec.mock.calls.length).toBe(1);
  });

  it("several", () => {
    const child1Exec = vi.fn();
    const child2Exec = vi.fn();
    const parent = new Atom();
    const child1 = new Atom({ exec: child1Exec });
    const child2 = new Atom({ exec: child2Exec });

    Atom.connect(parent, child1);
    Atom.connect(parent, child2);

    parent.update();

    expect(child1Exec.mock.calls.length).toBe(1);
    expect(child2Exec.mock.calls.length).toBe(1);
  });

  // Ветка, у которой exec вернул false, не должна обрывать соседние
  it("не обрывает обновление на неизменившемся атоме", () => {
    const source = createAtom(1);
    const doubled = select((get) => get(source) * 2);
    select((get) => (get(source) > 0 ? "always" : "other"));

    source.set(5);

    expect(doubled.get()).toBe(10);
  });

  it("не считает то, до чего изменение не дошло", () => {
    const source = createAtom(1);
    const flag = select((get) => get(source) > 0);

    let runs = 0;
    select((get) => {
      runs++;
      return get(flag);
    });

    runs = 0;
    source.set(2);

    expect(runs).toBe(0);
  });

  // Ромб с неизменившимся родителем ломается двумя разными способами:
  // обрывом обхода по exec === false и постановкой в очередь только
  // изменившимся родителем. Второе зависит от порядка создания атомов,
  // поэтому проверяются оба
  function diamond(constantFirst: boolean): string {
    const source = createAtom(1);

    let changing: Atom<number>;
    let constant: Atom<boolean>;

    // Меняется только порядок создания: он задаёт порядок, в котором
    // родители попадут в очередь обновления
    if (constantFirst === true) {
      constant = select((get) => get(source) > 0);
      changing = select((get) => get(source) * 10);
    } else {
      changing = select((get) => get(source) * 10);
      constant = select((get) => get(source) > 0);
    }

    const out = select((get) => `${get(changing)}|${get(constant)}`);

    source.set(2);

    return out.get();
  }

  it("ромб с неизменившимся родителем, изменяющийся создан первым", () => {
    expect(diamond(false)).toBe("20|true");
  });

  it("ромб с неизменившимся родителем, неизменный создан первым", () => {
    expect(diamond(true)).toBe("20|true");
  });

  it("считает атом ромба один раз и зовёт слушателя один раз", () => {
    const source = createAtom(1);
    const left = select((get) => get(source) + 2);
    const right = select((get) => get(source) * 20);

    const runs: string[] = [];
    const out = select((get) => {
      const value = `${get(left)}|${get(right)}`;
      runs.push(value);
      return value;
    });

    const fired: string[] = [];
    out.listeners.subscribe((value) => fired.push(value));

    runs.length = 0;
    source.set(2);

    expect(runs).toEqual(["4|40"]);
    expect(fired).toEqual(["4|40"]);
  });

  it("передаёт слушателю значение, а не атом", () => {
    const source = createAtom(1);
    let received: unknown;
    source.listeners.subscribe((value) => {
      received = value;
    });

    source.set(42);

    expect(received).toBe(42);
  });

  describe("динамические зависимости", () => {
    it("учитывает связь, появившуюся в ходе обновления", () => {
      const source = createAtom(1);
      const big = select((get) => get(source) * 100);
      const out = select((get) => (get(source) > 5 ? get(big) : -1));

      const fired: number[] = [];
      out.listeners.subscribe((value) => fired.push(value));

      source.set(10);

      expect(out.get()).toBe(1000);
      expect(fired).toEqual([1000]);
    });

    it("отпускает связь, пропавшую в ходе обновления", () => {
      const source = createAtom(10);
      const big = select((get) => get(source) * 100);
      const out = select((get) => (get(source) > 5 ? get(big) : -1));

      source.set(1);

      expect(out.get()).toBe(-1);
      expect(out.relations.parents.size).toBe(1);
    });

    it("разворачивает цепочку связей, появившихся в ходе обновления", () => {
      const source = createAtom(1);
      const first = select((get) => get(source) * 10);
      const second = select((get) => (get(source) > 5 ? get(first) + 1 : 0));
      const out = select((get) => (get(source) > 5 ? get(second) + 100 : 0));

      let fired = 0;
      out.listeners.subscribe(() => fired++);

      source.set(10);

      expect([first.get(), second.get(), out.get()]).toEqual([100, 101, 201]);
      expect(fired).toBe(1);
    });

    // Новая связь сама по себе не повод пересчитываться второй раз: если
    // родитель по порядку обхода успел отработать раньше, прочитано было
    // итоговое значение. Порядок задаётся порядком создания атомов
    it("не пересчитывает повторно, если новый родитель успел отработать", () => {
      const source = createAtom(-1);
      const flag = select((get) => get(source) > 0);
      const big = select((get) => get(source) * 100);

      let runs = 0;
      const out = select((get) => {
        runs++;
        return get(flag) ? get(big) : 0;
      });

      runs = 0;
      source.set(1);

      expect(runs).toBe(1);
      expect(out.get()).toBe(100);
    });

    it("пересчитывает повторно, если новый родитель не успел отработать", () => {
      const source = createAtom(-1);
      const big = select((get) => get(source) * 100);
      const flag = select((get) => get(source) > 0);

      let runs = 0;
      const out = select((get) => {
        runs++;
        return get(flag) ? get(big) : 0;
      });

      runs = 0;
      source.set(1);

      expect(runs).toBe(2);
      expect(out.get()).toBe(100);
    });
  });

  describe("циклы", () => {
    it("отвергает цикл через корень", () => {
      const first = new Atom();
      const second = new Atom();
      Atom.connect(first, second);
      Atom.connect(second, first);

      expect(() => first.update()).toThrow("cycle in the atom graph");
    });

    it("отвергает цикл в стороне от корня", () => {
      const first = new Atom();
      const second = new Atom();
      const third = new Atom();
      Atom.connect(first, second);
      Atom.connect(second, third);
      Atom.connect(third, second);

      expect(() => first.update()).toThrow("cycle in the atom graph");
    });

    it("отвергает цикл, сложившийся в ходе обновления", () => {
      const source = createAtom(1);

      const left: { atom?: Atom } = {};
      const right: { atom?: Atom } = {};

      left.atom = select((get) =>
        get(source) > 5 && right.atom !== undefined ? get(right.atom) : 0,
      );
      right.atom = select((get) =>
        get(source) > 5 && left.atom !== undefined ? get(left.atom) : 0,
      );

      expect(() => source.set(10)).toThrow("cycle in the atom graph");
    });
  });
});
