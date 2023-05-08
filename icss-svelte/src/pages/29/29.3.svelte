<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const getBackground = (args: string[]) => {
        return `background-image: url("${getAssetsUrl(
            "img.jpg"
        )}"), linear-gradient(${args.join(",")})`;
    };
</script>

制作 hover 效果

<div class="page">
    <div class="pic" style={getBackground(["#f00", "#00f"])} />
    <div class="pic" style={getBackground(['90deg', "#ff5722", "#03a9f4"])} />
    <div class="pic" style={getBackground(['-180deg', "#00bcd4", "#fa1a09"])} />
    <div class="pic" style={getBackground(['45deg', "#ffc107", "#3f51b5", "#4caf50", "#ff0057", "#fae105", "#5c00ff"])} />
</div>

<style>
    .page {
        width: 100%;
        height: 600px;
    }
    .pic {
        width: 200px;
        height: 150px;
        margin: 30px;
        float: left;
        background-size: cover, 100% 100%;
        background-position: 0 0, -300px 0;
        background-blend-mode: luminosity;
        background-repeat: no-repeat;
        transition: 0.5s background-position linear;
        cursor: pointer;
    }

    .pic:hover {
        background-position: 0 0, 0 0;
    }
</style>
