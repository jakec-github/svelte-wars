<script>
  import Arena from "../molecules/Arena.svelte";
  import Button from "../atoms/Button.svelte";

  export let player1Choice = null;
  export let player2Choice = null;
  export let handleClick;
</script>

<style>
  .button-wrapper {
    margin-top: 25px;
    text-align: center;
  }
</style>

<div>
  <Arena {player1Choice} {player2Choice} showPrompt={true} />
  <div class="button-wrapper">
    <Button onClick={handleClick} disabled={!(player1Choice && player2Choice)}>
      OK
    </Button>
  </div>
</div>
