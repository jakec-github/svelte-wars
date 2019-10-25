<script>
  export let showPrompt = false;

  $: text = showPrompt ? "Choose your contender!" : "?";
</script>

<style>
  div {
    display: inline-block;
    border: 2px solid black;
    border-radius: 5px;
    background-color: #444;
    width: 150px;
    min-height: 220px;
    position: relative;
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 150px;
    color: white;
    text-align: center;
    font-size: 18px;
    font-family: "body";
  }
</style>

<div>
  <span>{text}</span>
</div>
