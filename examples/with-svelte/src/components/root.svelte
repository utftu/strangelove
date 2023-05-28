<script>
  import {getMyAtoms, atom, select} from 'strangelove';
  import {addSvelteMyAtoms} from 'strangelove-svelte';

  addSvelteMyAtoms(getMyAtoms());

  const nameAtom = atom('Aleksey');
  const name = nameAtom.svelte;
  const familyAtom = atom('Smith');
  const family = familyAtom.svelte;
  const fullnameAtom = select((get) => get(nameAtom) + ' ' + get(familyAtom));
  const fullname = fullnameAtom.svelte;
</script>

<div class={$$props.class}>
  <div>
    Name:
    <input bind:value={$name} />
    <div>{$name}</div>
  </div>
  <div>
    Family:
    <input bind:value={$family} />
    <div>{$family}</div>
  </div>
  <div>
    Fullname:
    <div>{$fullname}</div>
  </div>
</div>
