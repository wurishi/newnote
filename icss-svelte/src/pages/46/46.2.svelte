文本选中效果

<p>
    The <span>box-decoration-break</span> CSS property specifies how an
    element's fragments should be rendered when broken across multiple lines,
    columns, or pages..Each box fragment is rendered independently with the
    <span>specified border, padding, and margin wrapping each fragment.</span>
    The border-radius, border-image, and box-shadow are applied to each
    <span>fragment independently.</span>
</p>

<style>
    p {
        font-size: 22px;
        line-height: 36px;
    }

    span {
        background-image: linear-gradient(135deg, deeppink, yellowgreen);
        color: #fff;
        padding: 2px 10px;
        border-radius: 50% 3em 50% 3em;
        -webkit-box-decoration-break: clone;
    }
</style>
