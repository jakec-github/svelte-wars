<script>
  import Arena from "../molecules/Arena.svelte";
  import StatMenu from "../molecules/StatMenu.svelte";

  import { PLAYER_1 } from "../../const";

  export let activePlayer;
  export let chosenCharacter;

  const onMenuClick = ({ target }) => {};
</script>

<style>
  .menu-wrapper {
    margin-top: 25px;
  }
</style>

<div>
  {#if activePlayer === PLAYER_1}
    <Arena player1Choice={chosenCharacter} />
  {:else}
    <Arena player2Choice={chosenCharacter} />
  {/if}
  <div class="menu-wrapper">
    <StatMenu {onMenuClick} />
  </div>
</div>
