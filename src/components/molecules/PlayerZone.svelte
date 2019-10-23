<script>
  import YourTurn from "../YourTurn.svelte";

  import CharacterStack from "./CharacterStack.svelte";

  export let player;
  export let characters;
  export let active = false;
  export let hide = false;
  export let handleCharacterClick;
</script>

<style>
  aside {
    width: 200px;
    text-align: center;
    margin: 0 auto;
    overflow-y: scroll;
  }

  .your-turn-wrapper {
    margin: 15px;
  }

  .hidden {
    opacity: 0;
  }
</style>

<aside class:hidden={hide === true}>
  <div class="your-turn-wrapper">
    <YourTurn {active} />
  </div>

  <CharacterStack {characters} {handleCharacterClick} {player} />

</aside>
