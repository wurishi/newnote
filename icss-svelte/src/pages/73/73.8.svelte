<script lang="ts">
    import { getAssetsUrl } from "../../proxy";
    const src = getAssetsUrl("img.jpg");
</script>

<div class="avatar">
    <img {src} alt="" />
</div>

<style>
    .avatar {
        position: relative;
        width: 120px;
        height: 120px;
        margin: auto;
        border: 1px solid #03a9f3;
        cursor: pointer;
        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
        transition: all 0.8s;
        background: linear-gradient(#00bcd4, #0a6ebd);
        overflow: hidden;
    }

    .avatar:hover {
        border-radius: 48% 28% 38% 49%/ 38% 42% 36% 47%;
    }
</style>
