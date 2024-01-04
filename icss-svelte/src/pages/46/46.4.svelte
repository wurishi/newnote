结合过渡动画

<p class="p1">
    The <span>box-decoration-break</span> CSS property specifies how an
    element's fragments should be rendered when broken across multiple lines,
    columns, or pages..Each box fragment is rendered independently with the
    <span>specified border, padding, and margin wrapping each fragment.</span>
    The border-radius, border-image, and box-shadow are applied to each
    <span>fragment independently.</span>
</p>

<style>
    .p1 {
        font-size: 22px;
        line-height: 36px;
        cursor: pointer;
    }

    .p1 span {
        padding: 2px 10px;
        border-radius: 50% 3em 50% 3em;
        -webkit-box-decoration-break: clone;
    }

    .p1:hover span {
        box-shadow: inset -1000px 0 0 #333;
        transition: box-shadow 600ms cubic-bezier(0.645, 0.045, 0.355, 1);
        color: #fff;
    }
</style>
