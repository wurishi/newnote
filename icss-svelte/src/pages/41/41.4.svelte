TAB 切换导航

<div class="panel">
    <button class="nav-a">Tab-A</button>
    <button class="nav-b">Tab-B</button>
    <div class="content">
        <div class="content-a">Content-A</div>
        <div class="content-b">Content-B</div>
    </div>
</div>

<style>
    .panel {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .content-a,
    .content-b {
        display: none;
    }

    .panel .nav-a,
    .panel .nav-b {
        display: block;
        width: 50%;
        text-align: center;
        border: 1px solid grey;
        box-sizing: border-box;
        height: 30px;
        line-height: 30px;
    }

    .panel .nav-a:focus,
    .panel .nav-b:focus {
        background-color: aqua;
    }

    .panel:not(:focus-within) .content-a {
        display: block;
    }

    .panel:not(:focus-within) .nav-a {
        background-color: aqua;
    }

    .panel .nav-a:focus-within ~ .content .content-a {
        display: block;
    }
    .panel .nav-a:focus-within ~ .content .content-b {
        display: none;
    }

    .panel .nav-b:focus-within ~ .content .content-a {
        display: none;
    }
    .panel .nav-b:focus-within ~ .content .content-b {
        display: block;
    }
</style>
