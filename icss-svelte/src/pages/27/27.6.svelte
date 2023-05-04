重复角向渐变
<div class="c1"></div>
repeating-conic-gradient:
<div class="c2"></div>

<style>
    div {
        width: 200px;
        height: 200px;
        border: 1px solid black;
    }
    .c1 {
        background: conic-gradient(deeppink 0 15deg, yellowgreen 0 30deg);
    }
    .c2 {
        background: repeating-conic-gradient(deeppink 0 15deg, yellowgreen 0 30deg);
    }
</style>