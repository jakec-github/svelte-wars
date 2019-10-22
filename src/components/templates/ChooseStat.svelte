<script>
  import Arena from "../molecules/Arena.svelte";
  import StatMenu from "../molecules/StatMenu.svelte";

  export let activePlayer;
  export let chosenCharacter;
</script>

<style>
  .menu-wrapper {
    margin-top: 25px;
  }
</style>

<div>
  {#if activePlayer === 'player1'}
    <Arena player1Character={chosenCharacter} />
  {:else}
    <Arena player2Character={chosenCharacter} />
  {/if}
  <div class="menu-wrapper">
    <StatMenu />
  </div>
</div>
