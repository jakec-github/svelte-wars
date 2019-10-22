<script>
  import Arena from "../molecules/Arena.svelte";
  import Button from "../Button.svelte";
  import Score from "../Score.svelte";

  export let player1Character = null;
  export let player2Character = null;
  export let player1Score = 0;
  export let player2Score = 0;
  export let topScore = 10;
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
    <Score value={player1Score} total={topScore} />
    <Score value={player2Score} total={topScore} />
  </div>
  <div class="button-wrapper">
    <Button>OK</Button>
  </div>
</div>
