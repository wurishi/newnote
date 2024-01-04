<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const text = new Array(20).fill('xxxxxxxxxxx，文字描述，xxxxxxxxx').join('\n');
</script>

shape-outside
<div class="container">
    <div class="shape-outside">
        <img src={getAssetsUrl("img.jpg")} />
    </div>
    {text}
</div>

<style>
    img {
        opacity: .5;
    }
    .shape-outside {
        float: left;
        shape-outside: circle(80px at 80px 80px);
    }
</style>