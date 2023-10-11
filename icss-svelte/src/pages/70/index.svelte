<script lang="ts">
    import C1 from "./70.1.svelte";
    import C2 from './70.2.svelte';
    import C3 from './70.3.svelte';
    import C4 from './70.4.svelte';
</script>

<div>
    <b>absolute:</b>position: absolute 配合
    top:50%;left:50%;transform:translate(-50%, -50%)
</div>
<div>
    <b>autobot:</b>display:flex 配合 margin:auto
</div>
<div>
    <b>flex:</b>display:flex 配合 align-items:center;justify-content:center
</div>
<div>
    <b>grid:</b>display:grid 配合 place-content:center
</div>
<hr />
<C1 />
<hr />
<C2 />
<hr />
<C3 />
<hr />
<C4 />