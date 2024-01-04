<ul>
    <li>导航栏</li>
    <li>PURE CSS</li>
    <li>HELLO WORLD</li>
    <li>About</li>
    <li>Underline</li>
</ul>

<style>
    ul {
        display: flex;
        list-style: none;
    }

    li {
        position: relative;
        padding: 20px;
        font-size: 24px;
        color: black;
        line-height: 1;
        transition: .2s all linear;
        cursor: pointer;
    }

    li::before {
        content: "";
        position: absolute;
        top: 0;
        left: 100%;
        width: 0;
        height: 100%;
        border-bottom: 2px solid black;
        transition: .2s all linear;
    }

    li:hover::before {
        width: 100%;
        top: 0;
        left: 0;
        transition-delay: .1s;
        border-bottom-color: black;
        z-index: -1;
    }

    li:hover ~ li::before {
        left: 0;
    }

    li:active {
        background: white;
        color: black;
    }

</style>