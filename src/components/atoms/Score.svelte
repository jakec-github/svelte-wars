<script>
  import { tweened } from "svelte/motion";

  const DELAY = 1500;

  export let value;
  export let total;

  const finalValue = tweened(0, {
    duration: (from, to) => to * DELAY
  });

  $: {
    const proportion = value / total;
    finalValue.set(proportion);
  }

  let displayValue = "-";

  setTimeout(() => {
    displayValue = value;
  }, DELAY);
</script>

<style>
  div {
    display: inline-block;
  }

  progress {
    -webkit-appearance: none;
  }

  progress::-webkit-progress-bar {
    background-color: black;
    border: 3px solid #f8dc01;
    border-radius: 5px;
    overflow: hidden;
  }

  progress::-webkit-progress-value {
    background-color: white;
  }

  p {
    display: block;
    text-align: center;
    color: white;
    font-family: "body";
  }
</style>

<div>
  <progress value={$finalValue} />
  <p>{displayValue}</p>
</div>
