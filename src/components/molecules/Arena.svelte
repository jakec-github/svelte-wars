<script>
  import Character from "../atoms/Character.svelte";
  import CharacterPrompt from "../atoms/CharacterPrompt.svelte";

  export let player1Choice = null;
  export let player2Choice = null;
  export let showPrompt = false;
</script>

<style>
  div {
    margin-top: 40px;
    display: flex;
    align-items: center;
  }

  p {
    margin: 15px;
    font-family: "body";
    color: white;
  }
</style>

<div>
  {#if player1Choice}
    <Character {...player1Choice} />
  {:else}
    <CharacterPrompt {showPrompt} />
  {/if}
  <p>VS</p>
  {#if player2Choice}
    <Character {...player2Choice} />
  {:else}
    <CharacterPrompt {showPrompt} />
  {/if}
</div>
