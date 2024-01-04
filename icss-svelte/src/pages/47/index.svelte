<script lang="ts">
    import C1 from "./47.1.svelte";
    import C2 from "./47.2.svelte";
    import C3 from "./47.3.svelte";
    import C4 from "./47.4.svelte";
    import C5 from "./47.5.svelte";

    let c1Show = true;
    let c2Show = true;
    let c3Show = true;
    let c4Show = true;
    let c5Show = true;
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

<input type="checkbox" bind:checked={c4Show} />
{#if c4Show}
    <C4 />
    <hr />
{/if}

<input type="checkbox" bind:checked={c5Show} />
{#if c5Show}
    <C5 />
    <hr />
{/if}
