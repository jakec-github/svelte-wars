<script>
  export let onClick;
  export let id;
</script>

<style>
  button {
    appearance: none;
    -webkit-appearance: none;
    padding: 5px 15px;
    border: 2px solid black;
    border-radius: 5px;
    background-color: gray;
    color: white;
    text-transform: uppercase;
    font-size: 18px;
    font-family: "body";
    min-width: 150px;
  }

  button:hover {
    cursor: pointer;
  }
</style>

<button on:click={onClick} {id}>
  <slot />
</button>
