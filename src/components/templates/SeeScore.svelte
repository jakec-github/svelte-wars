<script>
  import { createEventDispatcher } from "svelte";

  import Arena from "../molecules/Arena.svelte";
  import Button from "../Button.svelte";
  import Score from "../Score.svelte";
  import { getCraitAge } from "../../utils";

  const dispatch = createEventDispatcher();

  export let player1Character = null;
  export let player2Character = null;
  export let statChoice;

  let value1;
  let value2;
  let total;

  switch (statChoice) {
    case "height":
      value1 = Number(player1Character.height) || 0;
      value2 = Number(player2Character.height) || 0;
      total = Math.max(value1, value2, 200);
      break;
    case "films":
      value1 = player1Character.films.length;
      value2 = player2Character.films.length;
      total = Math.max(value1, value2, 9);
      break;
    case "age":
      value1 = getCraitAge(player1Character.birthYear);
      value2 = getCraitAge(player2Character.birthYear);
      total = Math.max(value1, value2, 200);
      break;
  }

  let roundWinner = value1 >= value2 ? "player1" : "player2";

  const handleClick = () => {
    dispatch("click", {
      roundWinner
    });
  };
</script>

<style>
  .score-wrapper {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
  }

  .button-wrapper {
    margin-top: 25px;
    text-align: center;
  }
</style>

<div>
  <Arena {player1Character} {player2Character} />
  <div class="score-wrapper">
    <Score value={value1} {total} />
    <Score value={value2} {total} />
  </div>
  <div class="button-wrapper">
    <Button onClick={handleClick}>OK</Button>
  </div>
</div>
