每行文字带特定边框
<br />

<p>
    The box-decoration-break CSS property specifies how an element's fragments
    should be rendered when broken across multiple lines, columns, or
    pages..Each box fragment is rendered independently with the specified
    border, padding, and margin wrapping each fragment. The border-radius,
    border-image, and box-shadow are applied to each fragment independently.
</p>

<style>
    p {
        display: inline;
        -webkit-box-decoration-break: clone;
        background: linear-gradient(
            110deg,
            deeppink 0%,
            deeppink 98%,
            transparent 98%,
            transparent 100%
        );
        font-size: 22px;
        line-height: 36px;
        padding: 0 30px 0 10px;
        color: #fff;
    }
</style>
