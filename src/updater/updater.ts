import { Atom } from "../atom/atom.ts";

type Node = {
  atom: Atom;
  children: Atom[];
  pending: number;
  queued: boolean;
  done: boolean;
  dirty: boolean;
};

function createNode(atom: Atom): Node {
  return {
    atom,
    children: [...atom.relations.children],
    pending: 0,
    queued: false,
    done: false,
    dirty: false,
  };
}

function collectNodes(roots: Set<Atom>): Map<Atom, Node> {
  const store: Map<Atom, Node> = new Map();
  const path: Set<Atom> = new Set();

  function visit(atom: Atom): void {
    path.add(atom);

    for (const childAtom of atom.relations.children) {
      if (path.has(childAtom) === true) {
        throw new Error("strangelove: cycle in the atom graph");
      }

      const knownNode = store.get(childAtom);
      if (knownNode !== undefined) {
        knownNode.pending++;
        continue;
      }

      const childNode = createNode(childAtom);
      childNode.pending = 1;
      store.set(childAtom, childNode);
      visit(childAtom);
    }

    path.delete(atom);
  }

  for (const root of roots) {
    if (store.has(root) === true) {
      continue;
    }

    store.set(root, createNode(root));
    visit(root);
  }

  return store;
}

function checkNewParents(
  atom: Atom,
  parentsBefore: Set<Atom>,
  store: Map<Atom, Node>,
): boolean {
  for (const parent of atom.relations.parents) {
    if (parentsBefore.has(parent) === true) {
      continue;
    }

    const parentNode = store.get(parent);
    if (parentNode === undefined) {
      continue;
    }

    if (parentNode.done === true) {
      continue;
    }

    return true;
  }

  return false;
}

function runPass(
  store: Map<Atom, Node>,
  roots: Set<Atom>,
  changedAtoms: Set<Atom>,
): Set<Atom> {
  const ready: Node[] = [];

  for (const root of roots) {
    const node = store.get(root)!;
    node.dirty = true;

    if (node.pending === 0) {
      node.queued = true;
      ready.push(node);
    }
  }

  const seeds: Set<Atom> = new Set();

  while (ready.length > 0) {
    const node = ready.pop()!;

    let changed = false;

    if (node.dirty === true) {
      const parentsBefore = new Set(node.atom.relations.parents);

      // Тип Exec обещает boolean, но на деле приходит и undefined,
      // поэтому сравнение не строгое
      changed = node.atom.exec(node.atom) !== false;

      if (checkNewParents(node.atom, parentsBefore, store) === true) {
        seeds.add(node.atom);
      }
    }

    node.done = true;

    if (changed === true) {
      changedAtoms.add(node.atom);
    }

    for (const childAtom of node.children) {
      const childNode = store.get(childAtom)!;

      if (changed === true) {
        childNode.dirty = true;
      }

      childNode.pending--;
      if (childNode.pending === 0 && childNode.queued === false) {
        childNode.queued = true;
        ready.push(childNode);
      }
    }
  }

  return seeds;
}

export function updateAtoms(root: Atom): void {
  const changedAtoms: Set<Atom> = new Set();

  let roots: Set<Atom> = new Set([root]);

  while (roots.size > 0) {
    const store = collectNodes(roots);
    roots = runPass(store, roots, changedAtoms);
  }

  for (const atom of changedAtoms) {
    atom.listeners.trigger(atom.get());
  }
}
