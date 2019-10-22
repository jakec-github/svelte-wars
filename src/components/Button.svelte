<script>
  export let onClick;
  export let id;
</script>

<style>
  button {
    appearance: none;
    -webkit-appearance: none;
    padding: 5px 15px;
    border-radius: 5px;
    background-color: white;
    color: black;
    text-transform: uppercase;
    font-size: 18px;
    font-family: "body";
    min-width: 150px;
  }

  button:hover {
    cursor: pointer;
    background-color: #f8dc01;

    color: white;
  }

  button:active {
    background-color: #20aeba;
    color: white;
  }
</style>

<button on:click={onClick} {id}>
  <slot />
</button>
