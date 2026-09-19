# strangelove

Библиотека атомов: значение, подписки и связи между ними. Публикуется в npm, на ней построена реактивность regan.

Публичный API — `src/strangelove.ts`: `Atom`, `createAtom`, `checkAtom`, `select`, типы `SelectCb` и `SelectGet`.

## Стек

Bun — рантайм, сборщик и тест-раннер. TypeScript в strict. dapes как раннер задач.

## Команды

```bash
npm test            # bun test
npm run check       # типы по всему src, включая тесты
npm run build       # build:js, затем build:types
npm run build:js    # бандл в dist/strangelove.js
npm run build:types # .d.ts в dist/types
```

Типы собирает tsc: `bun build` деклараций не выпускает.

## Структура

```
src/
  strangelove.ts       публичный API, только реэкспорт
  atom/atom.ts         Atom, createAtom, checkAtom
  select/select.ts     select и создание вычисляемого атома
    run-cb/run-cb.ts   запуск cb со сбором прочитанных атомов
    utils/utils.ts     replaceParents
  updater/updater.ts   обход графа при обновлении
  value/value.ts       хранение значения и сравнение с прежним
  relations/relations.ts  parents и children
  listeners/listeners.ts  подписки
  consts/consts.ts     noop, alwaysYes
```

Тест лежит рядом с модулем: `updater/updater.test.ts`. Отдельно `updater/fuzz.test.ts` — сверка обновления на случайных графах с пересчётом с нуля.

## Как читать

Смысловой центр — `updater/updater.ts`. Он один определяет, что библиотека гарантирует пользователю; остальные модули — хранение и связи. Контракт для пользователя описан в README, раздел «Как работает обновление».

Решения по модулям — `docs/decisions.md`.
