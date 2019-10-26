<script>
  export let value;
  export let total;

  $: proportion = value / total;
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
  <progress value={proportion} />
  <p>{value}</p>
</div>
