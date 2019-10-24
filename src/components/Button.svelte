<script>
  export let onClick;
  export let id;
  export let disabled = false;
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
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  button:hover {
    background-color: #f8dc01;
    color: white;
  }

  button:hover:disabled {
    background-color: white;
    color: black;
  }

  button:active {
    background-color: #20aeba;
    color: white;
  }

  button:active:disabled {
    background-color: white;
    color: black;
  }
</style>

<button on:click={onClick} {id} {disabled}>
  <slot />
</button>
