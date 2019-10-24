<script>
  export let active = false;
</script>

<style>
  div {
    display: inline-block;
    padding: 10px;
    border: 2px solid #20aeba;
    border-radius: 5px;
    font-family: "body";
    color: #20aeba;
  }

  .inactive {
    opacity: 0.2;
  }
</style>

{#if active}
  <div>
    <p>Your turn</p>
  </div>
{:else}
  <div class="inactive">
    <p>Your turn</p>
  </div>
{/if}
