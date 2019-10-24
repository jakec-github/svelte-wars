<script>
  import Arena from "../molecules/Arena.svelte";
  import Button from "../Button.svelte";

  export let player1Character = null;
  export let player2Character = null;
  export let handleClick;
</script>

<style>
  .button-wrapper {
    margin-top: 25px;
    text-align: center;
  }
</style>

<div>
  <Arena {player1Character} {player2Character} />
  <div class="button-wrapper">
    <Button
      onClick={handleClick}
      disabled={!(player1Character && player2Character)}>
      OK
    </Button>
  </div>
</div>
