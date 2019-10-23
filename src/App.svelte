<script>
  import { onMount } from "svelte";

  import Button from "./components/Button.svelte";

  import PlayerZone from "./components/molecules/PlayerZone.svelte";

  import ChooseStat from "./components/templates/ChooseStat.svelte";
  import ChooseCharacter from "./components/templates/ChooseCharacter.svelte";
  import SeeScore from "./components/templates/SeeScore.svelte";
  import GameOver from "./components/templates/GameOver.svelte";

  import { getRandomPositiveInt, updateCharacters } from "./utils";

  const DECK_SIZE = 5;
  const TOTAL_CHARACTERS = 87;

  // Probably should refactor this out of an array
  const STAGES = ["CHOOSE STAT", "CHOOSE CHARACTER", "SEE SCORE", "GAME OVER"];

  let startingPlayer = getRandomPositiveInt(2);
  let stage = STAGES[0];
  let round = 1;
  let activePlayer;

  let characters = [];
  let player1Characters;
  let player2Characters;
  let player1Character;
  let player2Character;
  let statChoice;

  $: {
    if (stage === STAGES[2] || stage === STAGES[4]) {
      activePlayer = null;
    } else if ((startingPlayer + round) % 2) {
      activePlayer = stage === STAGES[0] ? "player2" : "player1";
    } else {
      activePlayer = stage === STAGES[0] ? "player1" : "player2";
    }
  }

  $: {
    if (stage === STAGES[0]) {
      if (activePlayer === "player1") {
        const randomCharacter = getRandomPositiveInt(DECK_SIZE) - 1;
        player1Character = characters[randomCharacter];
        player1Characters = [
          ...characters.slice(0, randomCharacter),
          ...characters.slice(randomCharacter + 1, DECK_SIZE)
        ];

        player2Characters = characters.slice(DECK_SIZE);
      } else {
        const randomCharacter = getRandomPositiveInt(DECK_SIZE) - 1 + DECK_SIZE;
        player2Character = characters[randomCharacter];
        player2Characters = [
          ...characters.slice(DECK_SIZE, randomCharacter),
          ...characters.slice(randomCharacter + 1, DECK_SIZE * 2)
        ];

        player1Characters = characters.slice(0, DECK_SIZE);
      }
    }
  }

  onMount(async () => {
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

  const handleStatChoice = ({ detail }) => {
    stage = STAGES[1];
    statChoice = detail.choice;
  };

  const handleCharacterClick = ({
    currentTarget: {
      dataset: { player, index }
    }
  }) => {
    const i = Number(index);

    if (player === activePlayer && stage === STAGES[1]) {
      if (activePlayer === "player1") {
        const { newCharacterStack, newLiveCharacter } = updateCharacters(
          player1Character,
          player1Characters,
          i
        );
        player1Character = newLiveCharacter;
        player1Characters = newCharacterStack;
      } else {
        const { newCharacterStack, newLiveCharacter } = updateCharacters(
          player2Character,
          player2Characters,
          i
        );
        player2Character = newLiveCharacter;
        player2Characters = newCharacterStack;
      }
    }
  };
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

  .main-wrapper {
    text-align: center;
    perspective: 200px;
  }

  p {
    color: #f8dc01;
    font-size: 90px;
    font-family: "title";
    line-height: 66px;
    margin-top: 40px;
    transform: rotate3d(1, 0, 0, 12deg);
  }
</style>

<div class="wrapper">
  <main>
    <PlayerZone
      player="player1"
      characters={player1Characters}
      active={activePlayer === 'player1'}
      hide={stage === STAGES[3]}
      {handleCharacterClick} />
    <div class="main-wrapper">
      <p>
        SVELTE
        <br />
        WARS
      </p>
      {#if stage === STAGES[0]}
        <ChooseStat
          {activePlayer}
          chosenCharacter={activePlayer === 'player1' ? player1Character : player2Character}
          on:choice={handleStatChoice} />
      {:else if stage === STAGES[1]}
        <ChooseCharacter {player1Character} {player2Character} />
      {:else if stage === STAGES[2]}
        <SeeScore
          player1Character={player1Characters[0]}
          player2Character={player2Characters[0]}
          player1Score={5}
          player2Score={8}
          topScore={15} />
      {:else if stage === STAGES[3]}
        <GameOver winner="player1" />
      {/if}
    </div>

    <PlayerZone
      player="player2"
      characters={player2Characters}
      active={activePlayer === 'player2'}
      hide={stage === STAGES[3]}
      {handleCharacterClick} />
  </main>
</div>
