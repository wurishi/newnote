<script lang="ts">
    let flag = false;
</script>

box-decoration-break: slice / clone;
<br />
<input type="checkbox" id="type" bind:checked={flag} />
<label for="type">box-decoration-break: clone</label>
<br />
<span style={flag && "-webkit-box-decoration-break: clone;"}>ABCD<br />EFG<br />HI<br />JKLMN</span>

<style>
    span {
        font-size: 48px;
        border: 2px solid #999;
        line-height: 80px;
        -webkit-box-direction-break: slice;
    }
</style>
