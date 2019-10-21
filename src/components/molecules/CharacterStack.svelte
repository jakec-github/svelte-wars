<script>
  import Character from "../Character.svelte";

  export let characters = [];
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  article:not(:last-child) {
    margin-bottom: 5px;
  }
</style>

<div>
  <div />
  {#each characters as { name, src } (name)}
    <article>
      <Character {name} {src} />
    </article>
  {/each}
</div>
