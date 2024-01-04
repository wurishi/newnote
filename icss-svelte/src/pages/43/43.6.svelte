<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const img = getAssetsUrl("w.webp");
</script>

彩色投影
<div class="container">
    <div class="avatar" style={`background-image: url("${img}");`} />
</div>

<style>
    .container {
        width: 200px;
        margin: 20px 100px;
    }

    .avatar {
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
    }

    .avatar::after {
        content: "";
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: inherit;
        transform: scale(0.95);
        z-index: -1;
        animation: filterChange 10s infinite linear;
    }

    @keyframes filterChange {
        0% {
            top: 0;
            filter: blur(0) brightness(101%) opacity(1);
        }
        40% {
            top: 10%;
            filter: blur(0) brightness(101%) opacity(1);
        }
        80% {
            top: 10%;
            filter: blur(10px) brightness(80%) opacity(0.8);
        }
        100% {
            top: 10%;
            filter: blur(10px) brightness(80%) opacity(0.8);
        }
    }
</style>
