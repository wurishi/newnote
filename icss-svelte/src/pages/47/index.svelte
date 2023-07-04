<script lang="ts">
    import C1 from "./47.1.svelte";
    import C2 from "./47.2.svelte";
    import C3 from './47.3.svelte'

    let c1Show = true;
    let c2Show = true;
    let c3Show = true;
</script>

<input type="checkbox" bind:checked={c1Show} />
{#if c1Show}
    <C1 />
    <hr />
{/if}

<input type="checkbox" bind:checked={c2Show} />
{#if c2Show}
    <C2 />
    <hr />
{/if}

<input type="checkbox" bind:checked={c3Show} />
{#if c3Show}
    <C3 />
    <hr />
{/if}
