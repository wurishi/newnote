<script lang="ts">
    import Bad from "./21.5.bad.svelte";
    import Good from "./21.5.good.svelte";

    let flag = true;
</script>

<input type="checkbox" bind:checked={flag}  />

{#if flag}
    <Bad />
{:else}
    <Good />
{/if}

<!-- <Good /> -->
