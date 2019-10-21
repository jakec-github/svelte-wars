<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let value;
  export let total;

  $: proportion = value / total;

  // const finalValue = tweened(0, {
  //   duration: 400,
  //   easing: cubicOut
  // });

  // finalValue.set(proportion);
</script>

<style>
  div {
    display: inline-block;
  }

  progress {
    -webkit-appearance: none;
  }

  progress::-webkit-progress-bar {
    background-color: gray;
    border-radius: 5px;
    overflow: hidden;
  }

  progress::-webkit-progress-value {
    background-color: black;
  }

  p {
    display: block;
    text-align: center;
  }
</style>

<div>
  <progress value={proportion} />
  <p>{value}</p>
</div>
