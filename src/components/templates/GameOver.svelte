<script>
  export let winner;

  $: text = winner === "player1" ? "Player 1" : "Player 2";
</script>

<style>
  p {
    margin-top: 40px;
    font-size: 25px;
    font-family: "body";
  }
</style>

<p>{text} wins!</p>
