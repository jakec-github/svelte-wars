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
    <slot name="active">
      <p>Your turn</p>
    </slot>
  </div>
{:else}
  <div class="inactive">
    <slot name="inactive">
      <p>Their turn</p>
    </slot>
  </div>
{/if}
