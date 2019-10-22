<script>
  import Character from "../Character.svelte";
  import CharacterPrompt from "../CharacterPrompt.svelte";

  export let player1Character = null;
  export let player2Character = null;
  export let showPrompt = false;
</script>

<style>
  div {
    margin-top: 220px;
    display: flex;
    align-items: center;
  }

  p {
    margin: 15px;
    font-family: "body";
  }
</style>

<div>
  {#if player1Character}
    <Character {...player1Character} />
  {:else}
    <CharacterPrompt {showPrompt} />
  {/if}
  <p>VS</p>
  {#if player2Character}
    <Character {...player2Character} />
  {:else}
    <CharacterPrompt {showPrompt} />
  {/if}
</div>
