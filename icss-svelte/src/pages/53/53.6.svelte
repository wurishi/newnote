<script lang="ts">
    let flag = true;

    let style = "";

    $: style = flag ? "padding-bottom: 9999px; margin-bottom: -9999px;" : "";
</script>

<h2>负值 `margin`</h2>
<label for="flag">启用padding/margin抵消</label>
<input id="flag" type="checkbox" bind:checked={flag} />
<div class="padmar">
    <div class="left" {style}>左侧布局内容<br /></div>
    <div class="right" {style}>
        右侧布局内容<br />
        右侧布局内容<br />
        右侧布局内容<br />
        右侧布局内容<br />
    </div>
</div>

<style>
    h2 {
        text-align: center;
        line-height: 60px;
        height: 60px;
        font-size: 20px;
        background: #00bcd4;
        color: #fff;
        margin: 0;
    }

    .padmar {
        position: relative;
        overflow: hidden;
    }

    .padmar .left {
        float: left;
        width: 200px;
        background: #4caf50;
    }

    .padmar .right {
        width: 100%;
        margin-left: 200px;
        background: #99afe0;
    }
</style>
