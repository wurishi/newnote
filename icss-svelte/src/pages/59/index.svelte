<p class="txt" style="color:red">123456789</p>

<p class="txt2" style="color:red!important">123456789</p>

<p class="txt3" style="color:red">123456789</p>

<style>
    .txt {
        color: green !important;
    }

    .txt2 {
        /* 无效 */
        /* color: green !important;  */
        /* 新版本 chrome 已修复 */
        animation: colorGreen 2s infinite;
    }

    @keyframes colorGreen {
        0%,
        100% {
            color: green;
        }
    }

    .txt3 {
        animation: colorGreen 2s infinite;
    }
</style>
