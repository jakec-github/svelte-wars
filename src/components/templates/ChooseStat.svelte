<script>
  import { createEventDispatcher } from "svelte";

  import Arena from "../molecules/Arena.svelte";
  import StatMenu from "../molecules/StatMenu.svelte";

  const dispatch = createEventDispatcher();

  export let activePlayer;
  export let chosenCharacter;

  const onMenuClick = ({ target }) => {
    dispatch("choice", {
      choice: target.id
    });
  };
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
    <StatMenu {onMenuClick} />
  </div>
</div>
