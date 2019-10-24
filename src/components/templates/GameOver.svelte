<script>
  export let winner;

  let text = winner === "player1" ? "Player 1" : "Player 2";
</script>

<style>
  p {
    margin-top: 40px;
    font-size: 45px;
    font-family: "body";
    color: white;
  }
</style>

<p>{text} wins!</p>
