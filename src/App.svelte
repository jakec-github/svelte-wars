<script>
  import { onMount } from "svelte";

  import PlayerZone from "./components/molecules/PlayerZone.svelte";
  import Button from "./components/Button.svelte";
  import { getRandomPositiveInt } from "./utils";

  console.log(Button);

  const DECK_SIZE = 5;
  const TOTAL_CHARACTERS = 87;

  // Probably should refactor this out of an array
  const STAGES = ["CHOOSE STAT", "CHOOSE CHARACTER", "SEE SCORE", "GAME OVER"];

  let characters = [];
  $: player1Characters = characters.slice(0, DECK_SIZE);
  $: player2Characters = characters.slice(DECK_SIZE);

  let currentPlayer = getRandomPositiveInt(2);
  let stage = STAGES[0];
  let turns = 0;

  onMount(async () => {
    // Can result in duplicate characters
    let characterIds = [];

    for (let i = 0; i < DECK_SIZE * 2; i += 1) {
      while (true) {
        const id = getRandomPositiveInt(TOTAL_CHARACTERS);
        if (!characterIds.includes(id) && id !== 17) {
          characterIds[i] = id;
          break;
        }
      }
    }

    characters = await Promise.all(
      characterIds.map(id => {
        return fetch(`https://swapi.co/api/people/${id}/`).then(
          async result => {
            console.log(result);
            const { name, films } = await result.json();
            return {
              name,
              films,
              src: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
            };
          }
        );
      })
    );
  });
</script>

<style>
  .wrapper {
    position: relative;
  }

  main {
    position: absolute;
    left: 50%;
    transform: translate(-50%);

    display: flex;
    height: 100vh;
    width: 1000px;
  }

  .game {
    border: 3px solid orangered;
    flex-grow: 1;
  }
</style>

<div class="wrapper">
  <main>
    <PlayerZone characters={player1Characters} />
    {#if stage === STAGES[0]}
      <div class="game" />
    {:else if stage === STAGES[1]}
      <div class="game" />
    {:else if stage === STAGES[2]}
      <div class="game" />
    {:else if stage === STAGES[3]}
      <div class="game" />
    {/if}
    <PlayerZone characters={player2Characters} />
  </main>
</div>
