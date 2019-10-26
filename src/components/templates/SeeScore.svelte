<script>
  import { createEventDispatcher } from "svelte";

  import Arena from "../molecules/Arena.svelte";
  import Button from "../atoms/Button.svelte";
  import Score from "../atoms/Score.svelte";

  import { PLAYER_1, PLAYER_2 } from "../../const";
  import { getCraitAge } from "../../utils";

  export let player1Choice = null;
  export let player2Choice = null;
  export let statChoice;

  let value1;
  let value2;
  let total;

  const handleClick = () => {};
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
  <Arena {player1Choice} {player2Choice} />
  <div class="score-wrapper">
    <Score value={value1} {total} />
    <Score value={value2} {total} />
  </div>
  <div class="button-wrapper">
    <Button onClick={handleClick}>OK</Button>
  </div>
</div>
