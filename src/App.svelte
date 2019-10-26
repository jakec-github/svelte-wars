<script>
  import { onMount } from "svelte";

  import Button from "./components/atoms/Button.svelte";

  import PlayerZone from "./components/molecules/PlayerZone.svelte";

  import ChooseStat from "./components/templates/ChooseStat.svelte";
  import ChooseCharacter from "./components/templates/ChooseCharacter.svelte";
  import SeeScore from "./components/templates/SeeScore.svelte";
  import GameOver from "./components/templates/GameOver.svelte";

  import {
    DECK_SIZE,
    TOTAL_CHARACTERS,
    CHOOSE_STAT,
    CHOOSE_CHARACTER,
    SEE_SCORE,
    GAME_OVER,
    PLAYER_1,
    PLAYER_2
  } from "./const";

  import {
    getCharacterData,
    getRandomPositiveInt,
    updateCharacters
  } from "./utils";

  // Game state
  let startingPlayer = getRandomPositiveInt(2);
  let stage = CHOOSE_STAT;
  let round = 1;
  let activePlayer;
  let statChoice;
  let winner;

  // Player state
  let player1Deck;
  let player2Deck;
  let player1Choice;
  let player2Choice;

  $: {
    if (stage === SEE_SCORE) {
      activePlayer = null;
    } else if ((startingPlayer + round) % 2) {
      activePlayer = stage === CHOOSE_STAT ? PLAYER_2 : PLAYER_1;
    } else {
      activePlayer = stage === CHOOSE_STAT ? PLAYER_1 : PLAYER_2;
    }
  }

  // Reactivity 2
  // code here

  // Lifecycle
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

    player1Deck = characters.slice(0, DECK_SIZE);
    player2Deck = characters.slice(DECK_SIZE);
  });

  // Event handlers
  const handleStatChoice = () => {};

  const handleCharacterClick = ({
    currentTarget: {
      dataset: { player, index }
    }
  }) => {
    const i = Number(index);

    if (player === activePlayer && stage === CHOOSE_CHARACTER) {
      if (activePlayer === PLAYER_1) {
        const { newCharacterDeck, newLiveCharacter } = updateCharacters(
          player1Choice,
          player1Deck,
          i
        );
        player1Choice = newLiveCharacter;
        player1Deck = newCharacterDeck;
      } else {
        const { newCharacterDeck, newLiveCharacter } = updateCharacters(
          player2Choice,
          player2Deck,
          i
        );
        player2Choice = newLiveCharacter;
        player2Deck = newCharacterDeck;
      }
    }
  };

  const handleConfirmClick = () => {
    stage = SEE_SCORE;
  };

  const handleScoreClick = ({ detail }) => {
    if (detail.roundWinner === PLAYER_1) {
      player1Deck = [...player1Deck, player1Choice, player2Choice];
    } else {
      player2Deck = [...player2Deck, player1Choice, player2Choice];
    }
    player1Choice = null;
    player2Choice = null;

    if (!player1Deck.length) {
      winner = PLAYER_2;
      stage = GAME_OVER;
    } else if (!player2Deck.length) {
      winner = PLAYER_1;
      stage = GAME_OVER;
    } else {
      round += 1;
      stage = CHOOSE_STAT;
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
      player={PLAYER_1}
      characters={player1Deck}
      active={activePlayer === PLAYER_1}
      hide={stage === GAME_OVER} />
    <div class="main-wrapper">
      <p>
        SVELTE
        <br />
        WARS
      </p>
      {#if stage === CHOOSE_STAT}
        <ChooseStat
          {activePlayer}
          chosenCharacter={activePlayer === PLAYER_1 ? player1Choice : player2Choice}
          on:choice={handleStatChoice} />
      {:else if stage === CHOOSE_CHARACTER}
        <ChooseCharacter
          {player1Choice}
          {player2Choice}
          handleClick={handleConfirmClick} />
      {:else if stage === SEE_SCORE}
        <SeeScore {player1Choice} {player2Choice} {statChoice} />
      {:else if stage === GAME_OVER}
        <GameOver {winner} />
      {/if}
    </div>

    <PlayerZone
      player={PLAYER_2}
      characters={player2Deck}
      active={activePlayer === PLAYER_2}
      hide={stage === GAME_OVER} />
  </main>
</div>
