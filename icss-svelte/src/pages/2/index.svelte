<h1>2. 条纹边框的多种实现方式</h1>
1. background 和 border 配合
<div class="background-border" />
2. 上面方案的反过来
<div class="background-border-2" />

<style>
    div {
        position: relative;
        width: 180px;
        height: 180px;
    }

    .background-border {
        background: #9c27b0;
        border: 20px dashed #2196f3;
    }
    .background-border::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: white;
    }

    .background-border-2 {
        background: white;
        background-clip: padding-box;
        border: 20px dashed #cccc99;
    }
    .background-border-2::before {
        content: "";
        position: absolute;
        top: -20px;
        left: -20px;
        bottom: -20px;
        right: -20px;
        background: #996699;
        z-index: -1;
    }
</style>
