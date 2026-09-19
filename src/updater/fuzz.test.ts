import {describe, it, expect} from "bun:test";

import { Atom, createAtom } from "../atom/atom.ts";
import { select } from "../select/select.ts";

// Проверка от противного: на случайных графах результат инкрементального
// обновления сверяется с честным пересчётом с нуля. Ловит целый класс
// ошибок порядка обхода, которые на руками написанных случаях проходят —
// такие ошибки часто зависят от порядка создания атомов, и заметить их
// на конкретном графе можно только по удаче.

// Свой ГПСЧ, а не Math.random: падение должно воспроизводиться по сиду
function makeRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

// Формула одного узла. Условие делает зависимости динамическими:
// набор читаемых родителей меняется вместе со значениями
type Spec = {
  cond: number;
  left: number;
  right: number;
  mul: number;
};

function evalSpec(spec: Spec, read: (index: number) => number): number {
  if (read(spec.cond) % 2 === 0) {
    return read(spec.left) + 1;
  }

  return read(spec.right) * spec.mul;
}

function createSpecs(size: number, random: () => number): Spec[] {
  const specs: Spec[] = [];

  for (let i = 0; i < size; i++) {
    // Читаем только из более ранних узлов, поэтому граф заведомо
    // ацикличный. Индекс 0 — источник, остальные — select
    const pick = () => Math.floor(random() * (i + 1));

    specs.push({
      cond: pick(),
      left: pick(),
      right: pick(),
      mul: 1 + Math.floor(random() * 3),
    });
  }

  return specs;
}

// Эталон: вычисление с нуля, сверху вниз, без всякой инкрементальности.
// Мемоизация тут только чтобы не считать экспоненту, на результат
// она не влияет
function createPureEval(specs: Spec[], sourceValue: number): (index: number) => number {
  const store: Map<number, number> = new Map([[0, sourceValue]]);

  function evalPure(index: number): number {
    const known = store.get(index);
    if (known !== undefined) {
      return known;
    }

    const value = evalSpec(specs[index - 1], evalPure);
    store.set(index, value);

    return value;
  }

  return evalPure;
}

function runCase(seed: number, size: number): string | undefined {
  const random = makeRandom(seed);
  const specs = createSpecs(size, random);

  const start = Math.floor(random() * 20);
  const source = createAtom(start);
  const atoms: Atom[] = [source];

  for (const spec of specs) {
    atoms.push(select((get) => evalSpec(spec, (index) => get(atoms[index]))));
  }

  // Несколько set подряд по одному графу: так проверяется и состояние,
  // перенесённое между обновлениями, — оставленные рёбра и снимки детей,
  // снятые с графа предыдущей формы
  let current = start;

  for (let step = 0; step < 4; step++) {
    current = current + 1 + Math.floor(random() * 20);
    source.set(current);

    const evalPure = createPureEval(specs, current);

    for (let i = 1; i <= size; i++) {
      const actual = atoms[i].get();
      const expected = evalPure(i);

      if (actual !== expected) {
        return `сид ${seed}, размер ${size}, set №${step + 1}, узел ${i}: ${actual} вместо ${expected}`;
      }
    }
  }

  return;
}

describe("updater на случайных графах", () => {
  it("совпадает с пересчётом с нуля", () => {
    const failures: string[] = [];

    for (let seed = 1; seed <= 4000; seed++) {
      for (const size of [3, 6, 12, 25]) {
        const failure = runCase(seed * 977 + size, size);
        if (failure !== undefined && failures.length < 5) {
          failures.push(failure);
        }
      }
    }

    expect(failures).toEqual([]);
  });
});
