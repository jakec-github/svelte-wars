<script>
  import Button from "../atoms/Button.svelte";

  export let onMenuClick = () => {
    console.log("Default");
  };
</script>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 5px;
  }
</style>

<div>
  <Button id="height" onClick={onMenuClick}>Height</Button>
  <Button id="age" onClick={onMenuClick}>Age</Button>
  <Button id="films" onClick={onMenuClick}>Films</Button>
</div>
