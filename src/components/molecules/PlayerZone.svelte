<script>
  import YourTurn from "../YourTurn.svelte";

  import CharacterStack from "./CharacterStack.svelte";

  export let characters;
  export let activePlayer = false;
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
</style>

<aside>
  <div class="your-turn-wrapper">
    <YourTurn />
  </div>

  <CharacterStack {characters} />

</aside>
