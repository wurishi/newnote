<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        const list = document.querySelector("#list");
        if (list) {
            for (let i = 0; i < 10; i++) {
                const opt = document.createElement("option");
                opt.value = "Item" + i;
                list.appendChild(opt);
            }
        }
    });
</script>

<input list="list" on:change={() => console.log("chang")} />
<datalist id="list">
    <option value="Apple" />
    <option value="Ab" />
</datalist>
