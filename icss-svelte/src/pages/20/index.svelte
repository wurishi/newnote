<script lang="ts">
    import Single from "./single.svelte";
    import C1 from "./1.svelte";
    import C2 from './2.svelte';
    import C3 from './3.svelte';
    import C4 from './4.svelte';
    import C5 from './5.svelte';
</script>

<div />

<Single />

<C1 />

<C2 />

<C3 />

<C4 />

<C5 />

<style>
    :root {
        --color1: #ffc700;
        --color2: #e91e1e;
        --color3: #6f27b0;
    }

    div {
        width: 100%;
        height: 100px;
        background: linear-gradient(90deg, var(--color1) 0%, var(--color2) 100%);
        animation: gradientChange 2s infinite;
    }

    @keyframes gradientChange {
        100% {
            background: linear-gradient(90deg, var(--color2) 0%, var(--color3) 100%);
        }
    }
</style>
