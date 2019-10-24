<script>
  import { onMount } from "svelte";

  import Button from "./components/Button.svelte";

  import PlayerZone from "./components/molecules/PlayerZone.svelte";

  import ChooseStat from "./components/templates/ChooseStat.svelte";
  import ChooseCharacter from "./components/templates/ChooseCharacter.svelte";
  import SeeScore from "./components/templates/SeeScore.svelte";
  import GameOver from "./components/templates/GameOver.svelte";

  import {
    getCharacterData,
    getRandomPositiveInt,
    updateCharacters
  } from "./utils";

  const DECK_SIZE = 2;
  const TOTAL_CHARACTERS = 87;

  // Probably should refactor this out of an array
  const STAGES = ["CHOOSE STAT", "CHOOSE CHARACTER", "SEE SCORE", "GAME OVER"];

  let startingPlayer = getRandomPositiveInt(2);
  let stage = STAGES[0];
  let round = 1;
  let activePlayer;

  let player1Characters;
  let player2Characters;
  let player1Character;
  let player2Character;
  let statChoice;
  let winner;

  $: {
    if (stage === STAGES[2] || stage === STAGES[4]) {
      activePlayer = null;
    } else if ((startingPlayer + round) % 2) {
      activePlayer = stage === STAGES[0] ? "player2" : "player1";
    } else {
      activePlayer = stage === STAGES[0] ? "player1" : "player2";
    }
  }

  $: if (player1Characters && player2Characters) {
    // May need to stop this running on mount
    if (stage === STAGES[0]) {
      if (activePlayer === "player1") {
        const randomCharacter =
          getRandomPositiveInt(player1Characters.length) - 1;
        player1Character = player1Characters[randomCharacter];
        player1Characters = [
          ...player1Characters.slice(0, randomCharacter),
          ...player1Characters.slice(
            randomCharacter + 1,
            player1Characters.length
          )
        ];
      } else {
        const randomCharacter =
          getRandomPositiveInt(player2Characters.length) - 1;
        player2Character = player2Characters[randomCharacter];
        player2Characters = [
          ...player2Characters.slice(0, randomCharacter),
          ...player2Characters.slice(
            randomCharacter + 1,
            player2Characters.length
          )
        ];
      }
    }
  }
  // OOOOOOOOOOOOOOOOOOOOOOOO
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

    const characters = await Promise.all(
      characterIds.map(id => {
        return fetch(`https://swapi.co/api/people/${id}/`).then(result =>
          getCharacterData(result, id)
        );
      })
    );

    player1Characters = characters.slice(0, DECK_SIZE);
    player2Characters = characters.slice(DECK_SIZE);
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

  const handleConfirmClick = () => {
    stage = STAGES[2];
  };

  const handleScoreClick = ({ detail }) => {
    if (detail.roundWinner === "player1") {
      player1Characters = [
        ...player1Characters,
        player1Character,
        player2Character
      ];
    } else {
      player2Characters = [
        ...player2Characters,
        player1Character,
        player2Character
      ];
    }
    player1Character = null;
    player2Character = null;

    if (!player1Characters.length) {
      winner = "player2";
      stage = STAGES[3];
    } else if (!player2Characters.length) {
      winner = "player1";
      stage = STAGES[3];
    } else {
      stage = STAGES[0];
    }
    console.log(winner);
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
        <ChooseCharacter
          {player1Character}
          {player2Character}
          handleClick={handleConfirmClick} />
      {:else if stage === STAGES[2]}
        <SeeScore
          {player1Character}
          {player2Character}
          {statChoice}
          on:click={handleScoreClick} />
      {:else if stage === STAGES[3]}
        <GameOver {winner} />
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
