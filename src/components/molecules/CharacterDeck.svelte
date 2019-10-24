<script>
  import Character from "../atoms/Character.svelte";

  export let characters = [];
  export let handleCharacterClick;
  export let player;
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  article:hover {
    cursor: pointer;
  }

  article:not(:last-child) {
    margin-bottom: 5px;
  }
</style>

<div>
  <div />
  {#each characters as { name, src }, i (name)}
    <article
      on:click={handleCharacterClick}
      data-index={i}
      data-player={player}>
      <Character {name} {src} />
    </article>
  {/each}
</div>
